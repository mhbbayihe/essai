"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "@/schemas/forgotSchema";
import { searchEmail } from "@/services/apiService";
import { useRouter } from "next/navigation"; 
import toast from 'react-hot-toast';

type FormData = {
    email: string;
};

const Forgot: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = async (data: FormData) => {
        console.log('Données de connexion :', data);
        await onSearchSubmit(data);
    };

    const onSearchSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const users = await searchEmail(data);
            console.log('Utilisateurs trouvés:', users);
            if (users.length > 0) {
                toast.success('Instructions de réinitialisation en cours !');
                localStorage.setItem('email', data.email);
                router.push('/users/reinitialisation');
            } else {
                toast.error('Aucun utilisateur trouvé avec cet email.');
            }
        } catch (error) {
            console.error('Erreur pendant la recherche:', error);
            toast.error('Erreur lors de la recherche de l\'email. Assurez-vous qu\'il est correct.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-[sans-serif] ">
            <div className="min-h-screen flex flex-col items-center justify-center py-9 px-4">
                <div>
                    <div className="flex items-center justify-center rounded-2xl bg-white shadow-xl">
                        <div className="md:flex flex-col items-center justify-center hidden max-w-80 px-4">
                            <Image src="/reset-pass-illus.png" alt="Illustration de connexion" width={200} height={200}/>
                            <div className="relative flex items-center justify-center">
                                <p className="text-center mt-4"><b>[titre]</b></p>
                            </div>
                            <div className="relative flex items-center justify-center text-gray-500">
                                <p className="text-center">Lorem ipsum dolor, sit amet consectetur. Nisi porttitor loremr mauris ornare</p>
                            </div>
                        </div>
                        <div className="max-w-md w-full md:border-l-2 px-7 py-9">
                            <h2 className="text-gray-800 text-4xl font-bold">Mot de passe oublié ?</h2>
                            <p className="text-gray-400 text-1xl mt-2 leading-relaxed">Pas de problème, nous vous enverrons des instructions de réinitialisation.</p>
                            <hr className="mt-3"/>
                            <form className="mt-9 space-y-2" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="text-gray-800 text-1xl mb-2 block"><b>Email</b></label>
                                    <div className="relative flex items-center">
                                        <input 
                                            {...register('email')} 
                                            type="email" 
                                            className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600" 
                                            placeholder="Entrer votre email" 
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                                            <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z"/>
                                        </svg>
                                    </div>
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="!mt-8">
                                    <button 
                                        type="submit" 
                                        className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white focus:outline-none`} 
                                        disabled={loading}
                                    >
                                        {loading ? 'Chargement...' : 'Continuer'}
                                    </button>
                                </div>
                                <a href="/users/login">
                                    <div className="text-blue-500">
                                        <div className="relative flex justify-center py-4">
                                            <div>
                                                <FontAwesomeIcon icon={faArrowLeft} fixedWidth className="text-blue-700 mr-2" />
                                            </div>
                                            <div>
                                                Retour à la connexion
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </form>
                        </div>
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

export default Forgot;