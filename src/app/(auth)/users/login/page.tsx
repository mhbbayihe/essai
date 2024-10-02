"use client"
import LoginForm from "@/components/login-form";
import { Toaster } from 'react-hot-toast';
const Login: React.FC = () => {
    return (
        <>
          <Toaster />
          <LoginForm />
        </>
      );
};

export default Login; 