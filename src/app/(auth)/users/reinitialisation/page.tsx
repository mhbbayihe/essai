"use client"
import ReinitialisationForm from "@/components/reinitialisation-form";
import { Toaster } from 'react-hot-toast';

const Reinitialisation: React.FC = () => {
  return (
    <>
      <Toaster />
      <ReinitialisationForm />
    </>  
  );
};

export default Reinitialisation;