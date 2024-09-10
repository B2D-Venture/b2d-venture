const InvestorFormField = ({ label, type }: InvestorFormFieldProps) => (
  <div>
    <label className="block text-xl font-medium text-[#423f3f] mb-1">
      {label}
    </label>
    <input
      type={type}
      className="p-3 rounded-lg bg-[#bfbfbf] w-full placeholder-[#605f5f]"
    />
  </div>
);

export default InvestorFormField;
