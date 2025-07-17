import RegisterForm from "@/components/register/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex items-center mt-[320px] justify-center">
      <div>
        <h1 className="text-4xl mb-6">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
