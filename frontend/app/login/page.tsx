import LoginForm from "@/components/login/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center mt-[320px] justify-center">
      <div>
        <h1 className="text-4xl mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
