"use client";

import Image from "next/image";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from "@/schemas/loginSchema";
import { loginUser } from "@/services/apiService";
import { useRouter } from "next/navigation"; 
import toast from 'react-hot-toast';
import { setCookie } from 'nookies'; // Importer pour gérer les cookies

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginUser(data);
      console.log('Réponse de connexion:', response);
  
      // Utilisez `response.token` si c'est la structure de la réponse
      if (response.token) { 
        setCookie(null, 'token', response.token, {
          maxAge: 2 * 60 * 60,
          path: '/',
        });
  
        toast.success('Connexion réussie!');
        router.push('/accueil');
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Identifiants invalides. Veuillez réessayer');
      setErrorMessage('Identifiants invalides. Veuillez réessayer.');
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-9 px-4">
        <div className="flex items-center justify-center rounded-2xl bg-white shadow-xl">
          <div className="md:flex hidden flex-col items-center justify-center max-w-80 px-4">
            <Image src="/login-illus.png" alt="Illustration de connexion" width={200} height={200}/>
            <div className="relative flex items-center justify-center mt-4">
              <p><b>[titre]</b></p>
            </div>
            <div className="relative flex items-center justify-center text-gray-500">
              <p className="text-center">Lorem ipsum dolor, sit amet consectetur. Nisi porttitor lorem mauris ornare</p>
            </div>
          </div>
          <div className="max-w-md w-full md:border-l-2 px-9 py-9">
            <h2 className="text-gray-800 text-4xl font-bold">Connexion</h2>
            <p className="text-gray-400 text-1xl mt-2 leading-relaxed">Renseigner les informations suivantes pour accéder à votre compte</p>
            <hr className="mt-3" />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form className="mt-9 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="text-gray-800 text-1xl mb-1 block"><b>Email</b></label>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    {...register('email')}
                    type="email"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600"
                    placeholder="Entrer votre email"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                    <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z"/>
                  </svg>
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="text-gray-800 text-1xl mb-1 block"><b>Mot de passe</b></label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    {...register('password')}
                    type="password"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600"
                    placeholder="Entrer votre mot de passe"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                    <path d="M6 6c0-3.311 2.689-6 6-6s6 2.688 6 6v4h3v14h-18v-14h3v-4zm14 5h-16v12h16v-12zm-13-5v4h10v-4c0-2.76-2.24-5-5-5s-5 2.24-5 5z"/>
                  </svg>
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              <div className="!mt-8">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Se connecter
                </button>
              </div>
              <div className="flex relative">
                <div className="gauche1 lg:text-base text-xs">
                  <p><a href="/users/forgot_password" className="text-blue-600">Mot de passe oublié ?</a></p>
                </div>
                <div className="droite1 lg:text-base text-xs">
                  <p>Nouveau utilisateur ?</p>
                  <p><a href="/register" className="text-blue-600">Créer un compte</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="pb-4">
        <span className="block text-center text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <p className="text-sm">[company_name] © 2024. Tous droits réservés.</p>
        </span>
      </footer>
    </div>
  );
}

export default LoginForm;