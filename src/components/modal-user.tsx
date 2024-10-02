"use client";

import React from "react";
import { z } from "zod";
import { userSchema } from "@/schemas/userSchema"; // Assurez-vous que le chemin est correct
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { updateUser } from '@/services/apiService'; // Correction ici
import { useRouter } from 'next/navigation';

type FormData = {
    name: string;
    subname: string;
    phone: string;
    birthday: string;
};



interface ModalUserProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    userId: string; // Ajout de l'ID utilisateur
    userInfo: any;
}

const ModalUser: React.FC<ModalUserProps> = ({ isOpen, onClose, title, userId,userInfo }) => {
    if (!isOpen) return null;

    const userstorage = localStorage.getItem('user');
    const user= JSON.parse(userstorage as string);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userSchema),
        defaultValues:{
            name: userInfo?.first_name || '',
            subname: userInfo?.last_name || '',
            birthday: userInfo?.birth_date ? userInfo.birth_date.split('T')[0] : '',

        }
    });

    const onSubmit = async (data: FormData) => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token absent');
            return;
        }
        

        try {
            const updateBody = {
                    first_name: data.name,
                    last_name: data.subname,
                    birth_date: new Date(data.birthday),
            };

            const updatedUser = await updateUser( updateBody); // Utilisation du service
            console.log(updatedUser);
            toast.success("Données modifiées avec succès !");
            router.push('/accueil');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Échec de la modification des données");
        }

        console.log(data);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-1/2">
                <h2 className="text-sm md:text-lg text-center font-bold mb-4">{title}</h2>
                <form className="mt-9 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-gray-800 text-sm mb-1 block"><b>Prénoms</b></label>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                {...register("subname")}
                                className={`w-full text-gray-800 text-sm border ${errors.subname ? 'border-red-500' : 'border-gray-300'} px-12 py-3 rounded-md outline-blue-600`}
                                placeholder="Entrer votre prénom"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                                <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/>
                            </svg>
                        </div>
                        {errors.subname && <p className="text-red-500 text-sm">{errors.subname.message}</p>}
                    </div>

                    <div>
                        <label className="text-gray-800 text-sm mb-1 block"><b>Noms</b></label>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                {...register("name")}
                                className={`w-full text-gray-800 text-sm border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-12 py-3 rounded-md outline-blue-600`}
                                placeholder="Votre nom"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                                <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/>
                            </svg>
                        </div>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
{/* 
                    <div>
                        <label className="text-gray-800 text-sm mb-1 block"><b>Numéro de téléphone</b></label>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                {...register("phone")}
                                className={`w-full text-gray-800 text-sm border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-12 py-3 rounded-md outline-blue-600`}
                                placeholder="Votre numéro de téléphone"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                                <path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376"/>
                            </svg>
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div> */}

                    <div>
                        <label className="text-gray-800 text-sm mb-1 block"><b>Date de naissance</b></label>
                        <div className="relative flex items-center">
                            <input
                                type="date"
                                {...register("birthday")}
                                className="w-full text-gray-800 text-sm border border-gray-300 pl-12 py-3 pr-2 rounded-md"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                                <path d="M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376"/>
                            </svg>
                        </div>
                        {errors.birthday && <p className= "text-red-500 text-sm">{errors.birthday.message}</p>}
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-2 py-2 rounded mt-4 lg:px-4">
                            Fermer
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-2 py-2 rounded mt-4 lg:px-4">
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalUser;