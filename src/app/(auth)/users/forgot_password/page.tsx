"use client"
import ForgotForm from "@/components/forgot-form";
import { Toaster } from 'react-hot-toast';
const ForgotPassword: React.FC = () => {
    return (
        <>
        <Toaster />
        <ForgotForm />
        </>
    );
};

export default ForgotPassword;
