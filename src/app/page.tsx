"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Countdown = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60); // Initialiser à 60 secondes

  useEffect(() => {
    if (timeLeft === 0) {
      // Rediriger l'utilisateur ou effectuer une action lorsque le temps est écoulé
      router.push('/page-de-destination'); // Remplacez par l'URL de votre choix
      return; // Sortir de l'effet
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1); // Décrémenter le temps restant
    }, 1000); // Mettre à jour chaque seconde

    return () => clearInterval(timerId); // Nettoyer l'intervalle à la désinstallation
  }, [timeLeft, router]); // Ajoutez `router` à la liste des dépendances

  return (
    <div>
      <h1>Compte à rebours : {timeLeft} secondes</h1>
      {timeLeft === 0 ? <p>Temps écoulé !</p> : <p>Temps restant !</p>}
    </div>
  );
};

export default Countdown;