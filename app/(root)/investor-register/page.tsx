import { InvestorRegisterForm } from "@/components/InvestorRegisterForm";

export default function InvestorRegister() {
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen mt-7">
        <div className="flex w-11/12 h-9/10">
          <h1 className="self-start text-white ml-70 text-[40px] font-bold mb-2">
            Investor Profile
          </h1>
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[57px]">
          <InvestorRegisterForm />
        </div>
      </div>
    </div>
  );
}
