import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface TFormData {
  username: string;
  email: string;
  password: string;
}

interface IFormContext {
  handleStepChange: (stepChange: number) => void;
  step: number;
  formData: TFormData;
  setFormData: Dispatch<SetStateAction<TFormData>>;
}

export const FormContext = createContext<IFormContext>({
  handleStepChange: () => {},
  step: 1,
  formData: {
    username: "",
    email: "",
    password: "",
  },
  setFormData: () => {},
});

interface IProps {
  children: ReactNode;
}

export function FormProvider({ children }: IProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TFormData>({
    username: "",
    email: "",
    password: "",
  });

  function handleStepChange(stepChange: number) {
    setStep((prevStep) => prevStep + stepChange);
  }

  return (
    <FormContext.Provider
      value={{
        handleStepChange,
        step,
        formData,
        setFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}
