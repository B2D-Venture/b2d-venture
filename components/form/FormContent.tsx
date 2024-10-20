import { FormContentProps } from '../../types/form/index.d';

const FormContent: React.FC<FormContentProps> = ({ label, showStepComponent, formComponent }) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="flex w-11/12 h-9/10">
                    <h1 className="self-start text-white ml-70 text-[40px] font-bold mt-5 mb-3">
                        {label}
                    </h1>
                </div>
                <div className="bg-[#d9d9d9] rounded-[30px] relative p-10 mt-5 w-full max-w-7xl">
                    <div className="w-full flex justify-center mb-8">
                        {showStepComponent}
                    </div>
                    {formComponent}
                </div>
            </div>
        </div>
    );
};

export default FormContent;
