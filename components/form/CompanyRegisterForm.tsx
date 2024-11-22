"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ProfileImageForm } from "@/components/form/elements/ProfileImageForm";
import { BannerImageForm } from "@/components/form/company/BannerImageForm";
import { useFormState } from "../FormContext";
import FormFields from "@/components/form/elements/FormFields";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import DocumentForm from "./company/DocumentForm";
import {
  addCompany,
  addDataRoom,
  changeToCompanyRole,
  addRaiseFunding,
  updateCompany,
  getDataRoomByCompanyId,
  deleteDataRoom,
  getCompanyRequestById,
  getOneRecentFundingByCompanyId,
  assignCategoriesToCompany,
  getCategoryIdsByCompanyId,
  updateCategoriesForCompany,
} from "@/lib/db/index";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { Company } from "@/types/company";
import FormLoading from "@/components/loading/FormLoading";
import Link from "next/link";
import { CompanyRegisterFormProps } from "@/types/form/index.d";
import CategorySelect from "./elements/CategorySelect";

const documentSchema = z.object({
  pdfs: z
    .array(
      z.object({
        lastModified: z.number(),
        name: z.string(),
        key: z.string(),
        serverData: z.any(),
        size: z.number(),
        url: z.string(),
      }),
    )
    .optional(),
});

const isOwnCompany = (
  urlId: number,
  user?: { roleIdNumber: number | null },
) => {
  return user?.roleIdNumber == urlId;
};

// Combine schemas
export const formSchema = z
  .object({
    logo: z.string().min(1, "Logo is required"),
    banner: z.string().min(1, "Banner is required"),
    name: z.string().min(1, "Company name is required"),
    abbr: z.string().min(1, "Abbreviation is required"),
    registrationNumber: z
      .number({
        required_error: "Registration Number is required.",
      })
      .min(1, "Registration Number must be at least 1")
      .max(999999, "Registration Number cannot exceed 999999"),
    description: z.string().min(1, "Description is required"),
    totalShare: z
      .number({
        required_error: "Total Shares is required.",
      })
      .min(0, "Total Shares cannot be negative")
      .max(1000000000, "Total Shares cannot be more than 1 billion"),
    fundingTarget: z
      .number({
        required_error: "Funding target is required.",
      })
      .min(0, "Funding target cannot be negative")
      .max(1000000000, "Funding target cannot be more than 1 billion"),
    minInvest: z
      .number({
        required_error: "Minimum investment is required.",
      })
      .min(0, "Minimum investment cannot be negative"),
    maxInvest: z
      .number({
        required_error: "Maximum investment is required.",
      })
      .min(0, "Maximum investment cannot be negative"),
    deadline: z.date({ required_error: "Deadline is required." }),
    priceShare: z
      .number({
        required_error: "Price per share is required.",
      })
      .min(0, "Price per share cannot be negative"),
    pitch: z
      .string()
      .min(1, "Pitch is required")
      .max(10000, "Pitch is too long"),
    status: z.boolean().default(false),
    document: documentSchema.optional(),
  })
  .refine((data) => data.minInvest <= data.maxInvest, {
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
  .refine((data) => data.fundingTarget <= data.totalShare, {
    message: "Funding target cannot be more than the Total Shares",
    path: ["fundingTarget"],
  });

export function CompanyRegisterForm({
  canEdit = false,
  companyEditId,
  onRoleChange,
}: CompanyRegisterFormProps) {
  const { handleStepChange } = useFormState();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialDocuments, setInitialDocuments] = useState<
    {
      id: number;
      companyId: number;
      documentName: string;
      documentSize: number;
      documentUrl: string;
      uploadDate: Date;
    }[]
  >([]);
  const [recentFunding, setRecentFunding] = useState<RaiseFunding | null>(null);
  const [hasPublish, setHasPublish] = useState<boolean>(false);
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? "";
  const [fileName, setFileName] = useState<string>("");
  const [initialCategories, setInitialCategories] = useState<string[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: company?.logo ?? "",
      banner: company?.banner ?? "",
      name: company?.name ?? "",
      abbr: company?.abbr ?? "",
      registrationNumber: undefined,
      description: company?.description ?? "",
      totalShare: undefined,
      fundingTarget: undefined,
      minInvest: undefined,
      maxInvest: undefined,
      deadline: undefined,
      priceShare: undefined,
      pitch: "",
    },
  });

  useEffect(() => {
    form.setValue("banner", fileName);
    form.trigger("banner");
  }, [fileName, form]);

  const { reset } = form;
  useEffect(() => {
    const fetchCompany = async () => {
      if (companyEditId !== undefined) {
        const companyRequest = await getCompanyRequestById(companyEditId);
        if ((companyRequest ?? []).length > 0) {
          setHasPublish(true);
        }
      }
      try {
        const response = await fetch("/api/company");
        if (response.ok) {
          const data = await response.json();
          if (companyEditId !== undefined) {
            if (
              Object.keys(data).length === 0 ||
              companyEditId != data.company.id
            ) {
              window.location.href = `/company/${companyEditId}`;
            } else {
              const funding =
                await getOneRecentFundingByCompanyId(companyEditId);
              const existingDocuments =
                await getDataRoomByCompanyId(companyEditId);
              const existingCategories =
                await getCategoryIdsByCompanyId(companyEditId);
              setInitialCategories(existingCategories ?? []);
              setCompany(data.company);
              setRecentFunding(funding);
              reset({
                logo: data.company.logo ?? "",
                banner: data.company.banner ?? "",
                name: data.company.name ?? "",
                abbr: data.company.abbr ?? "",
                registrationNumber:
                  Number(data.company.registrationNumber) ?? 0,
                description: data.company.description ?? "",
                totalShare: funding.totalShare ?? 0,
                fundingTarget: funding.fundingTarget ?? 0,
                minInvest: funding.minInvest ?? 0,
                maxInvest: funding.maxInvest ?? 0,
                deadline: funding.deadline
                  ? new Date(funding.deadline)
                  : undefined,
                priceShare: funding.priceShare ?? 0,
                pitch: data.company.pitch ?? "",
              });
              setInitialDocuments(existingDocuments ?? []);
            }
          }
        } else {
          window.location.href = `/company/${companyEditId}`;
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    if (canEdit) {
      fetchCompany();
    }

    if (!canEdit) {
      setInitialCategories(["0"]);
    }
    setLoading(false);
  }, [canEdit, companyEditId, reset]);

  if (loading) {
    return <FormLoading />;
  }

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { document, ...companyFormData } = values;
    const categories = selectedCategories
      ? selectedCategories.map((category) => Number(category))
      : null;
    const companyData: Company = {
      id: companyEditId,
      logo: companyFormData.logo,
      banner: companyFormData.banner,
      name: companyFormData.name,
      abbr: companyFormData.abbr,
      description: companyFormData.description,
      pitch: companyFormData.pitch,
      registrationNumber: companyFormData.registrationNumber.toString(),
    };

    if (!canEdit) {
      const raiseFundingData = {
        totalShare: companyFormData.totalShare,
        fundingTarget: companyFormData.fundingTarget,
        minInvest: companyFormData.minInvest,
        maxInvest: companyFormData.maxInvest,
        deadline: companyFormData.deadline.toISOString(),
        priceShare: companyFormData.priceShare,
        valuation: companyFormData.totalShare * companyFormData.priceShare,
      };

      addCompany(companyData)
        .then((companyId) => {
          if (categories && categories.length > 0) {
            assignCategoriesToCompany(companyId, categories);
          }
          addRaiseFunding(raiseFundingData, companyId);
          changeToCompanyRole({
            email: userEmail,
            companyId: companyId,
          });
          if (document && document.pdfs) {
            document.pdfs.forEach((pdf) => {
              const dataRoomEntry = {
                companyId: companyId,
                documentName: pdf.name,
                documentSize: pdf.size,
                documentUrl: pdf.url,
              };
              addDataRoom(dataRoomEntry);
            });
          }
          onRoleChange?.();
          handleStepChange(1);
        })
        .catch((err) => console.error("Error adding company:", err));
    } else {
      if (companyEditId === undefined) {
        return;
      }

      companyData.id = companyEditId;
      updateCompany(companyData);
      const updatedcategories = selectedCategories
        ? selectedCategories.map((category) => Number(category))
        : null;
      if (categories && categories.length > 0) {
        updateCategoriesForCompany(companyEditId, updatedcategories ?? []);
      }

      if (document && Array.isArray(document.pdfs)) {
        const newDocuments = document.pdfs.filter(
          (doc) =>
            !initialDocuments.some(
              (initDoc) => initDoc.id.toString() === doc.key,
            ),
        );

        const removedDocuments = initialDocuments.filter(
          (initDoc) =>
            !(document.pdfs ?? []).some(
              (doc) => doc.key === initDoc.id.toString(),
            ),
        );

        for (const pdf of newDocuments) {
          const dataRoomEntry = {
            companyId: companyEditId,
            documentName: pdf.name,
            documentSize: pdf.size,
            documentUrl: pdf.url,
          };
          addDataRoom(dataRoomEntry);
        }

        for (const pdf of removedDocuments) {
          deleteDataRoom(pdf.id);
        }
      } else {
        console.error(
          "document.pdfs is not an array or document is not defined",
          document,
        );
      }

      window.location.href = `/company/${companyEditId}`;
    }
  };

  return (
    <>
      {hasPublish ? (
        <div className="flex items-center justify-center">
          <div className="rounded-lg p-6 text-center">
            <h1 className="text-2xl font-semibold text-red-600 mb-4">
              Publication Notice
            </h1>
            <p className="text-gray-700 mb-4">
              Your information has been published. You can no longer edit it.
            </p>
            <Button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              <Link href={`/company/${companyEditId}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {canEdit && (
            <div className="text-black font-bold text-3xl bg-[#eeee] p-4 rounded-xl text-center m-8">
              Edit Company Profile
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 flex flex-col items-center">
                  <div>
                    <ProfileImageForm
                      setProfileImage={(file) => form.setValue("logo", file)}
                      defaultImage={company?.logo}
                    />
                  </div>
                  <div className="mt-3">
                    <FormField
                      control={form.control}
                      name="logo"
                      render={() => <FormMessage />}
                    />
                  </div>
                  <div className="text-sm bg-[#c4c4c3d2] text-gray-600 mt-4 text-center p-2 rounded-md">
                    <p className="font-medium leading-relaxed">
                      Please upload only a profile image of a real person. Do
                      not upload images of cartoons, animals, objects, or any
                      other type of image. Non-compliant uploads may be
                      rejected.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 col-span-3">
                  <div className="col-span-3">
                    <BannerImageForm
                      defaultBanner={company?.banner}
                      onChange={(newBanner) => setFileName(newBanner)}
                    />
                    <div className="mt-3">
                      <FormField
                        control={form.control}
                        name="banner"
                        render={() => <FormMessage />}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
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
                  {/* registration number */}
                  <div className="col-span-1">
                    <FormFields
                      control={form.control}
                      name="registrationNumber"
                      label="Registration Number"
                      dataId="registrationNumber-input"
                      type="number"
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
                      disabled={canEdit}
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
                      disabled={canEdit}
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
                      disabled={canEdit}
                    />
                  </div>
                  {/* Date (using CalendarForm) */}
                  <div className="col-span-1">
                    <FormFields
                      control={form.control}
                      label="Deadline"
                      name="deadline"
                      type="calendar"
                      disabled={canEdit}
                      defaultValue={
                        recentFunding?.deadline
                          ? new Date(recentFunding.deadline)
                          : undefined
                      }
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
                      disabled={canEdit}
                    />
                  </div>
                  {/* Total Shares */}
                  <div className="col-span-1">
                    <FormFields
                      control={form.control}
                      name="totalShare"
                      label="Total Shares"
                      dataId="totalShare-input"
                      placeholder="$"
                      type="number"
                      disabled={canEdit}
                    />
                  </div>

                  <hr className="col-span-3 border-[1px] border-[#b3b2b2ee]"></hr>

                  <CategorySelect
                    onCategoryChange={handleCategoryChange}
                    initialSelectedCategories={initialCategories}
                  />

                  <hr className="col-span-3 border-[1px] border-[#b3b2b2ee]"></hr>

                  <div className="col-span-3 flex items-center">
                    <DocumentForm
                      canEdit={canEdit}
                      companyId={companyEditId ?? 0}
                    />
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
                    {canEdit ? (
                      <Button
                        className="
                      w-[211px] h-[45px]
                      bg-gray-200 text-gray-700
                      rounded-lg shadow-md
                      hover:bg-gray-300 hover:text-gray-900
                      font-bold text-base
                      transition duration-200 ease-in-out
                      "
                      >
                        <Link href={`/company/${companyEditId}`}>Back</Link>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          const confirmBack = window.confirm(
                            "⚠ The information will be lost when you go back. Are you sure?",
                          );
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
                    )}
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
        </div>
      )}
    </>
  );
}
