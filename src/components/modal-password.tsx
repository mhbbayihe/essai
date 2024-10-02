"use client";
import { useState } from "react";
import React from "react";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast'; 
import { reinitialisationSchema } from "@/schemas/reinitialisationSchema";
import { resetPassword } from "@/services/apiService";
import { useRouter } from "next/navigation";

type FormData = {
  password: string;
  confirmPassword: string;
}

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ModalPassword: React.FC<ModalUserProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // État pour gérer la soumission

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(reinitialisationSchema),
  });

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Token manquant. Veuillez vous connecter.");
      return;
    }

    setIsSubmitting(true); // Commence la soumission

    try {
      const response = await resetPassword({ password: data.password });

      if (response) {
        toast.success("Mot de passe réinitialisé avec succès !");
        onClose(); // Ferme le modal après le succès
        router.push("/users/login"); // Redirige vers la page de connexion
      } else {
        toast.error("Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.");
        console.error("Réponse inattendue lors de la réinitialisation:", response);
      }
    } catch (error: any) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", error);
      const errorMessage = error.message || "Une erreur s'est produite. Veuillez réessayer.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false); // Fin de la soumission
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-lg text-center font-bold mb-4">{title}</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-gray-800 text-1xl mb-1 block"><b>Nouveau mot de passe</b></label>
            <input 
              {...register('password')} 
              type="password"
              className={`w-full text-gray-800 text-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} pl-2 py-3 rounded-md`} 
              placeholder="Nouveau mot de passe"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-gray-800 text-1xl mb-1 block"><b>Confirmer le mot de passe</b></label>
            <input 
              {...register('confirmPassword')} 
              type="password"
              className={`w-full text-gray-800 text-sm border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} pl-2 py-3 rounded-md`} 
              placeholder="Confirmer le mot de passe" 
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Fermer
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4" 
              disabled={isSubmitting} // Désactive le bouton pendant la soumission
            >
              {isSubmitting ? 'Modification...' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPassword;