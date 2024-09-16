import { CompanyRegisterForm } from "@/components/CompanyRegisterForm";

export default function CompanyRegister() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex w-11/12 h-9/10">
          <h1 className="self-start text-white ml-70 text-[40px] font-bold mt-5 mb-3">Company Profile</h1>
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[57px]">
          <CompanyRegisterForm />
        </div>
      </div>
    </div>
  );
}
