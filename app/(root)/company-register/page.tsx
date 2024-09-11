import { CompanyRegisterForm } from "@/components/CompanyRegisterForm"

export default function CompanyRegister() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-3/4 h-3/4 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[57px]">
        <CompanyRegisterForm />
      </div>
    </div>
  );
};

