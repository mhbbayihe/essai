"use client";
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import { comfirmerSchema } from '@/schemas/confirmerSchema';
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

// Définir un type pour les données du formulaire
interface FormData {
  inputs: string[];
}

const Verification: React.FC = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(comfirmerSchema),
    defaultValues: {
      inputs: ['', '', '', '', '', ''],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Données valides :", data);
    // Concaténer les valeurs en une seule chaîne
    const verify = data.inputs.join('');
    console.log("Résultat concaténé :", verify);
  };

  const handleValidation = (data: FormData) => {
    // Vérifier si tous les champs sont remplis
    const allFilled = data.inputs.every(input => input !== '');
    if (!allFilled) {
      alert("Tous les champs doivent être remplis !");
      return;
    }
    onSubmit(data);
  };

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Filtrer pour ne garder que les chiffres
    if (/^\d?$/.test(value)) {
      setValue(`inputs.${index}`, value); // Mettre à jour la valeur dans le formulaire
      if (value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus(); // Utiliser l'opérateur de chaîne optionnelle
      }
    } else {
      // Réinitialiser la valeur si ce n'est pas un chiffre
      setValue(`inputs.${index}`, '');
    }
  };

  // Fonction de référence pour les inputs
  const setInputRef = useCallback((el: HTMLInputElement | null, index: number) => {
    inputRefs.current[index] = el; // Mettre à jour la référence
  }, []);

  //compte a rebours
  const [timeLeft, setTimeLeft] = useState(60); // Initialiser à 60 secondes

  useEffect(() => {
    if (timeLeft === 0) return; // Si le compte à rebours atteint 0, ne rien faire

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1); // Décrémenter le temps restant
    }, 1000); // Mettre à jour chaque seconde

    return () => clearInterval(timerId); // Nettoyer l'intervalle à la désinstallation
  }, [timeLeft]);
  //fin du compte a rebours

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-9 px-4">
        <div>
          <div className="flex items-center justify-center rounded-2xl bg-white shadow-2xl">
            <div className="md:flex flex-col items-center justify-center hidden max-w-80 px-4">
              <Image src="/otp-illus.png" alt="" className="p-2" width={200} height={200} />
              <div className="relative flex items-center justify-center">
                <p className="text-center mt-4"><b>[titre]</b></p>
              </div>
              <div className="relative flex items-center justify-center text-gray-500">
                <p className="text-center">Lorem ipsum dolor, sit amet consectetur. Nisi porttitor loremr mauris ornare</p>
              </div>
            </div>
            <div className="max-w-md w-full md:border-l-2 px-7 py-9">
              <h2 className="text-gray-800 text-4xl font-bold">Code de vérification</h2>
              <p className="text-gray-400 text-1xl mt-2 leading-relaxed">Veuillez entrer le code qui vous a été envoyé dans le mail.</p>
              <hr className="mt-3" />
              <form className="mt-9 space-y-4" onSubmit={handleSubmit(handleValidation)}>
                <div className="flex justify-center items-center">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="mb-2">
                      <Controller
                        name={`inputs.${index}`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`border w-12 h-12 mx-1 rounded-xl text-black text-center text-2xl ${
                              errors.inputs && errors.inputs[index] ? 'border-red-500' : 'border-gray-300'
                            } hover:border-blue-500 outline-blue-500`}
                            maxLength={1}
                            ref={(el) => setInputRef(el, index)} // Utiliser la fonction de référence
                            onChange={handleChange(index)}
                            inputMode="numeric"
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>

                {errors.inputs && <p className="text-red-500 text-center">Tous les champs doivent être remplis !</p>}

                <div className="relatie flex justify-center pt-4">
                  Vous n&apos;avez pas reçu le code ? 
                  {timeLeft !== 0 && <a className="ml-1 text-blue-500"> Renvoyer ({timeLeft})</a>}
                  {timeLeft === 0 && <a href='/users/verification' className="ml-1 text-blue-500"> Renvoyer le code</a>}
                </div>

                <div className="!mt-8">
                  <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Continuer
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

        <footer className="m-4">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <p className="text-sm">[company_name] © 2024. Tous droits réservés.</p>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default Verification;