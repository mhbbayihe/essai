"use client";
import { useState } from "react";
import React from "react";
import { z } from 'zod';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
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

const Reinitialisation: React.FC = () => {
  const router = useRouter();

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
  
    try {
      const response = await resetPassword({ password: data.password });
  
      // Vérifiez si la réponse contient un identifiant d'utilisateur
      if (response ) {
        toast.success("Mot de passe réinitialisé avec succès !");
        router.push("/users/login"); // Redirige vers la page de connexion
      } else {
        toast.error("Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.");
        console.error("Réponse inattendue lors de la réinitialisation:", response);
      }
    } catch (error:any) {
      console.error("Erreur lors de la réinitialisation du mot de passe:", error);
      const errorMessage = error.message || "Une erreur s'est produite. Veuillez réessayer.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-9 px-4">
        <div className="flex items-center justify-center rounded-2xl bg-white shadow-2xl">
          <div className="md:flex flex-col items-center justify-center hidden max-w-80 px-4">
            <Image src="/new-pass-illus.png" alt="" width={200} height={200}/>
            <div className="relative flex items-center justify-center mt-4">
              <p><b>[titre]</b></p>
            </div>
            <div className="relative flex items-center justify-center text-gray-500">
              <p className="text-center">Lorem ipsum dolor, sit amet consectetur. Nisi porttitor lorem mauris ornare.</p>
            </div>
          </div>
          <div className="max-w-md w-full md:border-l-2 px-9 py-9">
            <h2 className="text-gray-800 text-4xl font-bold">Réinitialisation</h2>
            <p className="text-gray-400 text-1xl mt-2 leading-relaxed">Votre mot de passe doit contenir au moins 8 caractères alphanumériques.</p>
            <hr className="mt-6" />
            <form className="mt-3 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Nouveau mot de passe</b></label>
                <div className="relative flex items-center">
                  <input 
                      {...register('password')} 
                      type="password"
                      className={`w-full text-gray-800 text-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} pl-2 py-3 rounded-md outline-blue-600`} 
                      placeholder="Nouveau mot de passe"
                      aria-invalid={errors.password ? "true" : "false"}
                  />
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Confirmer le mot de passe</b></label>
                <div className="relative flex items-center">
                  <input 
                      {...register('confirmPassword')} 
                      type="password"
                      className={`w-full text-gray-800 text-sm border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} pl-2 py-3 rounded-md outline-blue-600`} 
                      placeholder="Confirmer le mot de passe" 
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              <div className="!mt-8">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Réinitialiser
                </button>
              </div>
              <a href="/users/login">
                <div className="text-blue-500">
                    <div className="relative flex justify-center py-4">
                        <FontAwesomeIcon icon={faArrowLeft} fixedWidth className="text-blue-700 mr-2" />
                        Retour à la connexion
                    </div>
                </div>
              </a>
            </form>
          </div>
        </div>
        
        <footer className="m-4">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <p className="text-sm">[company_name] © 2024. Tous droits réservés.</p>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default Reinitialisation;