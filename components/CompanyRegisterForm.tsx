"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ProfileImageForm } from "@/components/ProfileImageForm";
import { BannerImageForm } from "@/components/BannerImageForm";
import { useFormState } from "./FormContext"
import FormFields from '@/components/form/elements/FormFields';
import { 
  Form, 
  FormField, 
  FormMessage 
} from "@/components/ui/form";
import Document from "./form/company/Document";
import { 
  addCompany, 
  addCompanyRequest, 
  addDataRoom, 
  changeToCompanyRole, 
  getRecentRaiseFundingByCompanyId,
  addRaiseFunding,
  addRaiseFundingRequest,
} from "@/lib/db/index";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Company } from '@/types/company';

const documentSchema = z.object({
  pdfs: z.array(z.object({
    lastModified: z.number(),
    name: z.string(),
    key: z.string(),
    serverData: z.any(),
    size: z.number(),
    url: z.string(),
  })).optional(),
});


// Combine schemas
export const formSchema = z.object({
  logo: z.string().min(1, "Logo is required"),
  banner: z.string().min(1, "Banner is required"),
  name: z.string().min(1, "Company name is required"),
  abbr: z.string().min(1, "Abbreviation is required"),
  description: z.string().min(1, "Description is required"),
  fundingTarget: z.number().min(0, "Funding target cannot be negative"),
  minInvest: z.number().min(0, "Minimum investment cannot be negative"),
  maxInvest: z.number().min(0, "Maximum investment cannot be negative"),
  deadline: z.date({ required_error: "Deadline is required." }),
  priceShare: z.number().min(0, "Price per share cannot be negative"),
  pitch: z.string().min(1, "Pitch is required"),
  status: z.boolean().default(false),
  document: documentSchema.optional(),
}).refine((data) => data.minInvest <= data.maxInvest, {
  message: "Minimum investment cannot be greater than maximum investment.",
  path: ["minInvest"],
})
  .refine((data) => data.minInvest <= data.fundingTarget, {
    message: "Minimum investment cannot be greater than the funding target.",
    path: ["minInvest"],
  })
  .refine((data) => data.maxInvest <= data.fundingTarget, {
    message: "Maximum investment cannot be greater than the funding target.",
    path: ["maxInvest"],
  })
  .refine((data) => data.priceShare <= data.fundingTarget, {
    message: "Price per share cannot be more than the funding target",
    path: ["priceShare"]
  });

export function CompanyRegisterForm({ canEdit = false }: { canEdit?: boolean }) {
  const { handleStepChange } = useFormState();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentFunding, setRecentFunding] = useState<RaiseFunding | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: company?.logo ?? "",
      banner: company?.banner ?? "",
      name: company?.name ?? "",
      abbr: company?.abbr ?? "",
      description: company?.description ?? "",
      fundingTarget: 0,
      minInvest: 0,
      maxInvest: 0,
      deadline: undefined, 
      priceShare: 0,
      pitch: "",
    },
  });

  const { reset } = form;
  if (canEdit) {
    useEffect(() => {
        const fetchCompany = async () => {
            const response = await fetch('/api/company');
            if (response.ok) {
                const data = await response.json();
                const funding = await getRecentRaiseFundingByCompanyId(data.company.id);
                setCompany(data.company);
                setRecentFunding(funding);
                console.log("funding", funding);
                reset({
                    logo: data.company.logo ?? "",
                    banner: data.company.banner ?? "",
                    name: data.company.name ?? "",
                    abbr: data.company.abbr ?? "",
                    description: data.company.description ?? "",
                    fundingTarget: funding.fundingTarget ?? 0,
                    minInvest: funding.minInvest ?? 0,
                    maxInvest: funding.maxInvest ?? 0,
                    deadline: funding.deadline ? new Date(data.company.deadline) : undefined,
                    priceShare: funding.priceShare ?? 0,
                    pitch: data.company.pitch ?? "",
                });
            } else {
                window.location.href = `/signup?callbackUrl=/company-profile`;
            }
            setLoading(false);
        };

        fetchCompany();
    }, [reset]);
  }

  const setBannerImage = (fileName: string) => {
    form.setValue("banner", fileName);
    form.trigger("banner");
  };

  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? "";

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { document, ...companyFormData } = values;
    console.log("Hello");
    const companyData = {
      logo: companyFormData.logo,
      banner: companyFormData.banner,
      name: companyFormData.name,
      abbr: companyFormData.abbr,
      description: companyFormData.description,
      pitch: companyFormData.pitch,
    };

    console.log("companyData", companyData);
    handleStepChange(1);
    if (!canEdit) {
      console.log("Add company");
      const raiseFundingData = {
        fundingTarget: companyFormData.fundingTarget,
        minInvest: companyFormData.minInvest,
        maxInvest: companyFormData.maxInvest,
        deadline: companyFormData.deadline.toISOString(),
        priceShare: companyFormData.priceShare,
      }
      
      addCompany(companyData)
      .then((companyId) => {
        addCompanyRequest({ companyId: companyId });
        addRaiseFunding(raiseFundingData, companyId)
          .then((raiseId) => addRaiseFundingRequest({ raiseFundingId: raiseId }))
          .catch((err) => console.error("Error adding raise funding:", err));
        changeToCompanyRole({
          email: userEmail,
          companyId: companyId,
        });
        if (document && document.pdfs) {
          document.pdfs.forEach((pdf) => {
            const dataRoomEntry = {
              companyId: companyId,
              documentName: pdf.name,
              documentUrl: pdf.url,
            };
            addDataRoom(dataRoomEntry);
          });
        }

        handleStepChange(1);
      })
      .catch((err) => console.error("Error adding company:", err));
    } else {
      console.log("Edit company");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 flex flex-col items-center">
            <div>
              <ProfileImageForm setProfileImage={(file) => form.setValue("logo", file)} defaultImage={company?.logo} />
            </div>
            <div className="mt-3">
              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormMessage />
                )}
              />
            </div>
            <div className="text-[12px] text-[#949191] mt-5">
              <p>
                Please upload only a profile image of a real person. Do not
                upload images of cartoons, animals, objects, or any other type
                of image. Non-compliant uploads may be rejected.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-3">
            <div className="col-span-3">
              <BannerImageForm setBannerImage={setBannerImage} defaultBanner={company?.banner} />
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="banner"
                  render={() => (
                    <FormMessage />
                  )}
                />
              </div>
            </div>
            <div className="col-span-2">
              <FormFields
                control={form.control}
                name="name"
                label="Company Name"
                dataId="company-input"
              />
            </div>
            {/* abbreviation */}
            <div className="col-span-1">
              <FormFields
                control={form.control}
                name="abbr"
                label="Company Abbreviation"
                dataId="abbr-input"
                placeholder="XXXX"
              />
            </div>
            {/* description */}
            <div className="col-span-3">
              <FormFields
                control={form.control}
                name="description"
                label="Description"
                dataId="desc-input"
              />
            </div>
            {/* Funding Goal */}
            <div className="col-span-1">
              <FormFields
                control={form.control}
                name="fundingTarget"
                label="Funding Goal"
                dataId="funding-input"
                placeholder="$"
                type="number"
                disabled={true}
              />
            </div>
            {/* Minimum Investment */}
            <div className="col-span-1">
              <FormFields
                control={form.control}
                name="minInvest"
                label="Minimum Investment"
                dataId="min-input"
                placeholder="$"
                type="number"
                disabled={true}
              />
            </div>
            {/* Maximum Investment */}
            <div className="col-span-1">
              <FormFields
                control={form.control}
                name="maxInvest"
                label="Maximum Investment"
                dataId="max-input"
                placeholder="$"
                type="number"
                disabled={true}
              />
            </div>
            {/* Date (using CalendarForm) */}
            <div className="col-span-1">
              <FormFields
                control={form.control}
                label="Deadline"
                name="deadline"
                type="calendar"
                disabled={true}
                defaultValue={recentFunding?.deadline ? new Date(recentFunding.deadline) : undefined}
              />
            </div>
            {/* Price per Share */}
            <div className="col-span-1">
              <FormFields
                control={form.control}
                name="priceShare"
                label="Price per Share"
                dataId="share-input"
                placeholder="$"
                type="number"
                disabled={true}
              />
            </div>

            <hr className="col-span-3 border-[1px] border-[#b3b2b2ee]"></hr>

            <div className="col-span-3 flex items-center">
              <Document canEdit={canEdit} />
            </div>

            <hr className="col-span-3 border-[1px] border-[#b3b2b2ee]"></hr>

            <div className="col-start-1 col-span-3">
              <h2 className="text-3xl text-gray-700">Pitch</h2>
              <FormFields
                control={form.control}
                name="pitch"
                dataId="pitch-input"
                type="pitch"
              />
            </div>
            <div className="col-start-1">
              <Button
                onClick={() => {
                  const confirmBack = window.confirm("⚠ The information will be lost when you go back. Are you sure?");
                  if (confirmBack) {
                    handleStepChange(-2);
                  }
                }}
                className="
                  w-[211px] h-[45px] 
                  bg-gray-200 text-gray-700 
                  rounded-lg shadow-md 
                  hover:bg-gray-300 hover:text-gray-900 
                  font-bold text-base 
                  transition duration-200 ease-in-out
                "
              >
                Back
              </Button>
            </div>
            <div className="col-start-3">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
