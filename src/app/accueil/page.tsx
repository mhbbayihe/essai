"use client";
import React, { useState } from 'react';
import MonProfil from "@/components/mon-profil";
import ModalUser from "@/components/modal-user";
import ModalPassword from "@/components/modal-password";
import { Toaster } from 'react-hot-toast';


const Accueil: React.FC = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const handleUserInfo = (user:any)=>{
    setUserInfo(user)
   
  }

  return (
    <div className="">
      <Toaster />
      <MonProfil 
        onOpenUserModal={openUserModal} 
        onOpenPasswordModal={openPasswordModal} 
        handleUserInfo={handleUserInfo}
      />
      <ModalUser 
        isOpen={isUserModalOpen} 
        onClose={closeUserModal} 
        title="Détails de l'utilisateur"
        userInfo={userInfo}
      />
      <ModalPassword 
        isOpen={isPasswordModalOpen} 
        onClose={closePasswordModal} 
        title="Modifier le mot de passe de l'utilisateur" 
      />
    </div>
  );
};

export default Accueil;