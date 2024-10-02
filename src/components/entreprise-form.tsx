"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useEffect, useState } from 'react';
import { entrepriseSchema } from "@/schemas/entrepriseSchema";


// Définir une interface pour les données du pays
interface Country {
  code: string;
  name: string;
}

type FormData = {
  code: string,
  name: string;
}

const Entreprise: React.FC = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(entrepriseSchema),
  });

  // Spécifier le type de l'état countries
  const [countries, setCountries] = useState<Country[]>([]);
  const selectedCountry = watch("country");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const countryList: Country[] = data.map((country: any) => ({
        code: country.cca2,
        name: country.name.common,
      }));

      countryList.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(countryList);
    };

    fetchCountries();
  }, []);

  const onSubmit = (data: any) => {
    console.log("Formulaire soumis avec succès :", data);
  };

  return (
    <div className="font-[sans-serif] backdrop-filter backdrop-blur-2xl">
      <div className="min-h-screen flex flex-col items-center justify-center py-9 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow-xl">
            <h2 className="text-gray-800 text-4xl font-bold">Entreprise</h2>
            <p className="text-gray-400 text-1xl mt-2 leading-relaxed">
              Veuillez renseigner quelques informations importantes liées à l&apos;entreprise.
            </p>
            <hr className="mt-3" />
            <form className="mt-9 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Nom de l&apos;entreprise</b></label>
                <div className="relative flex items-center">
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full text-gray-800 text-sm border border-gray-300 px-12 py-3 rounded-md outline-blue-600"
                    placeholder="Entrer l'entreprise"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-4 h-4 absolute left-4" viewBox="0 0 24 24">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7h-9V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-11 6H3v-2h8zm0-5v1H3V7h8zm-8 7h8v2H3zm8-12v2H3V3zM3 19h8v2H3zm18 2h-8V9h8zm-5-5h-2v-2h2zm0 4h-2v-2h2zm4-4h-2v-2h2zm-4-4h-2v-2h2zm4 0h-2v-2h2zm0 8h-2v-2h2z"/></svg>
                  </svg>
                </div>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-lxl mb-1 block"><b>Pays</b></label>
                <div className="border-gray-200 border px-2 py-1 rounded-md">
                  <select {...register("country")} className="w-full text-gray-800 text-sm border-none py-3 rounded-md outline-none">
                    <option value="">Sélectionnez un pays</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.country && <p className="text-red-500">{errors.country.message}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-1xl mb-1 block"><b>Téléphone</b></label>
                <div className="relative">
                  <PhoneInput
                    international
                    defaultCountry={selectedCountry}
                    value={watch("phone")}
                    onChange={phone => setValue("phone", phone)}
                    className="w-full text-gray-800 border border-gray-300 rounded-md pl-2 py-3"
                    disabled={!selectedCountry}
                  />
                </div>
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Valider
                </button>
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

export default Entreprise;