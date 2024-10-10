"use client";

import React from "react";
import { FormProvider } from "@/components/FormContext";
import FormStep from "@/components/form/FormStep";

const RoleRegister = () => {
  return (
    <div className="flex justify-center items-center min-h-scree p-6">
      <FormProvider>
        <FormStep />
      </FormProvider>
    </div>
  );
};

export default RoleRegister;
