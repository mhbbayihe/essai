"use client";

import React from "react";
import { z } from "zod";
import { registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerUser } from "@/services/apiService";
import { searchEmail } from "@/services/apiService";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

type FormData = {
  email: string;
  password: string;
  subname: string;
  name: string;
  accept: boolean;
};

const Register: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!data.accept) {
      setErrorMessage('Vous devez accepter les conditions d\'utilisation.');
      return;
    }

    setLoading(true);
    try {
      const RegisterBody = {
        email: data.email,
        password: data.password,
        locale: 'fr',
        individual_profile: {
          first_name: data.name,
          last_name: data.subname,
        },
      };
      //verifier si l"email existe dans la base de donnée
      const users = await searchEmail(data);
      console.log('Utilisateurs trouvés:', users);
      //si l'email existe
      if (users.length > 0) {
          //on verifie si l'account est true
          toast.error('Email déjà utilisé !');
      } else {
          await registerUser(RegisterBody);
          router.push('/accueil'); // Redirection après inscription réussie
      }
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErrorMessage('Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-9 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow-xl">
            <h2 className="text-gray-800 text-4xl font-bold">Inscription</h2>
            <form className="mt-9 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              
              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Email</b></label>
                <div className="relative flex items-center">
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600"
                    placeholder="Entrer votre email"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                    <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z"/>
                  </svg>
                </div>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Prénoms</b></label>
                <div className="relative flex items-center">
                  <input
                    {...register('subname')}
                    type="text"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600"
                    placeholder="Votre prénom"
                    aria-invalid={errors.subname ? "true" : "false"}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/>
                  </svg>
                </div>
                {errors.subname && <p className="text-red-500">{errors.subname.message}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Noms</b></label>
                <div className="relative flex items-center">
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600"
                    placeholder="Votre nom"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/>
                  </svg>
                </div>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Mot de passe</b></label>
                <div className="relative flex items-center">
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600"
                    placeholder="Entrer votre mot de passe"
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                    <path d="M6 6c0-3.311 2.689-6 6-6s6 2.688 6 6v4h3v14h-18v-14h3v-4zm14 5h-16v12h16v-12zm-13-5v4h10v-4c0-2.76-2.24-5-5-5s-5 2.24-5 5z"/>
                  </svg>
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="items-center">
                  <input type="checkbox"
                    {...register('accept')} 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    aria-invalid={errors.accept ? "true" : "false"}
                  />
                  <label className="ml-3 text-sm text-gray-800">
                    J&apos;accepte les <span className="text-blue-600">Conditions d&apos;utilisation</span> et <span className="text-blue-600">Politique de confidentialité</span>
                  </label>
                  {errors.accept && <p className="text-red-500">{errors.accept.message}</p>}
                </div>
              </div>

              <div className="!mt-8">
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Chargement...' : "S'inscrire"}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Vous avez déjà un compte? <a href="/users/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Connectez-vous</a>
              </p>
            </form>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
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

export default Register;