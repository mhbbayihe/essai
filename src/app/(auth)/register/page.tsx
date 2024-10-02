"use client";
import RegisterForm from "@/components/register-form";
import { Toaster } from 'react-hot-toast';
const Register: React.FC = () => {
  return (
      <>
      <Toaster />
      <RegisterForm />
      </>
  );
};

export default Register;