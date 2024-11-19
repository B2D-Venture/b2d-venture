import { Button } from "@/components/ui/button";
import { OutputTextBox } from "@/components/admin/OutputTextBox";
import DataroomRequestBadge from "@/components/company/dataroom/card/DataRoomBadge";
import { CheckIcon } from "@radix-ui/react-icons";
import { RejectButton } from "@/components/admin/reject/RejectButton";
import { InvestorProps } from "@/types/investor";

import Image from "next/image";

export function DataRoomCard({
  investor,
  companyId,
  handleApprove,
  handleReject,
}: {
  investor: InvestorProps;
  companyId?: number;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="w-full space-y-5">
      <div className="flex justify-center items-center">
        <Image
          src={investor.profileImage}
          alt="Investor Profile"
          width={500}
          height={500}
          className="w-14 h-14 rounded-full col-span-1"
        />
        <span className="flex-1 text-black text-xl font-bold mx-3">{investor.firstName + " " + investor.lastName}</span>
      </div>
      <div className="border-b-2 border-black mt-2 mb-2" />
      <DataroomRequestBadge />
      <div className="grid grid-cols-3 text-black justify-start w-full my-2">
        <div>
          <OutputTextBox
            label="Birthdate"
            value={investor.birthDate}
          />
        </div>
        <div>
          <OutputTextBox
            label="Email"
            value={investor.email}
          />
        </div>
        <div>
          <OutputTextBox
            label="Nationality"
            value={investor.nationality}
          />
        </div>
        <div>
          <OutputTextBox
            label="Net Worth"
            value={investor.networth}
            iconSideLeft="$"
          />
        </div>
        <div>
          <OutputTextBox
            label="Investable Money"
            value={investor.investableAmount}
            iconSideLeft="$"
          />
        </div>
      </div>
      <div className="flex flex-row space-x-2 justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="bg-green-500"
          onClick={handleApprove}
        >
          <CheckIcon className="h-4 w-4" />
        </Button>

        <RejectButton type="funding" request={investor} email={investor.email} handleReject={handleReject} companyId={companyId} />
      </div>
    </div>
  );
}
