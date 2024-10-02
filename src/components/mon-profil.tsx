import React,{ useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from "@/services/apiService";

interface MonProfilProps {
  onOpenUserModal: () => void;
  onOpenPasswordModal: () => void;
  handleUserInfo: (user:any) => void;
}

const MonProfil: React.FC<MonProfilProps> = ({ onOpenUserModal, onOpenPasswordModal,handleUserInfo }) => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<any>(null);

  const userstorage = localStorage.getItem('user');
  const user= JSON.parse(userstorage as string); 

  useEffect(()=>{
const getUser=async ()=>{
  const user = await fetchUserProfile()
 
  setUserInfo(user)
}

getUser()
  },[])

const handleOpenUpdateModal = ()=>{
  handleUserInfo(userInfo)
  onOpenUserModal()
}



  return (
    <div className="accueil">
      <nav className="bg-white border-gray-200 rounded-t-2xl dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-center max-w-screen-xl mx-auto">
            <div className="flex items-center lg:order-2 p-3">
                <button data-collapse-toggle="mobile-menu-2" type="button"
                    className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="mobile-menu-2" aria-expanded="true">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"></path>
                    </svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 text-sm font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="#"
                            className="block  border-b-2 border-blue-600 mr-9 h-9 mt-5 pl-6 text-white bg-blue-600  lg:bg-transparent lg:text-blue-600 lg:p-0 dark:text-white"
                            aria-current="page">Mon profil</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block pl-6 mr-9 h-9 mt-5  text-gray-600 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">item 2</a>
                    </li>
                    <li>
                        <a href="#"
                            className="h-9 pl-6 mt-5 block mr-9  text-gray-600 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">item 3</a>
                    </li>
                    <li>
                        <a href="#"
                            className="h-9 pl-6 mt-5 block mr-9  text-gray-600 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">item 4</a>
                    </li>
                    <li>
                        <a href="#"
                            className=" h-9 pl-6 mt-5 block mr-9  text-gray-600 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">item 5</a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
      <hr />
      <div className="page mt-9 pb-6 rounded-xl border border-gray-200">
        <div className="flex bg-gray-50 rounded-t-xl">
          <div className="gauche text-lg pl-6 py-3">
            <b>Utilisateur</b>
          </div>
          <div className="droite pr-6 py-3">
            <button onClick={handleOpenUpdateModal} className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded">
              Modifier
            </button>
          </div>
        </div>
        <div className="px-6 pt-6 text-sm">
          <div className="flex">
            <div className="gauche text-gray-400">
              <p className="pb-6 mr-3">Prénoms</p>
            </div>
            <div>
              <p className="pb-6 ml-3"><b>{userInfo?.last_name }</b></p>
            </div>
          </div>
          <div className="flex">
            <div className="gauche text-gray-400">
              <p className="pb-6 mr-3">Noms</p>
            </div>
            <div>
              <p className="pb-6 ml-3"><b>{userInfo?.first_name }</b></p>
            </div>
          </div>
          <div className="flex">
            <div className="gauche text-gray-400">
              <p className="pb-6 mr-3">Email</p>
            </div>
            <div>
              <p className="pb-6 ml-3"><b>{user?.email }</b></p>
            </div>
          </div>
          <div className="flex">
            <div className="gauche text-gray-400">
              <p className="pb-6 mr-3">Numéro de téléphone</p>
            </div>
            <div>
              <p className="pb-6 ml-3"><b>{user?.mobile_phone }</b></p>
            </div>
          </div>
          <div className="flex">
            <div className="gauche text-gray-400">
              <p className="mr-3">Date de naissance</p>
            </div>
            <div>
              <p className="ml-3"><b>{userInfo?.birth_date ? userInfo.birth_date.split('T')[0] : ''}</b></p>
            </div>
          </div>
        </div>
      </div>

      <div className="page mt-9 rounded-xl border border-gray-200">
        <div className="flex bg-gray-50 rounded-t-xl">
          <div className="gauche text-lg pl-6 py-3">
            <b>Accés</b>
          </div>
        </div>
        <div className="flex p-6 text-sm">
          <div className="gauche text-gray-400">
            <p>Mot de passe</p>
          </div>
          <div>
            <button onClick={onOpenPasswordModal} className="text-blue-600 underline">
              Changer votre mot de passe
            </button>
          </div>
        </div>
      </div>

      <div className="page mt-9 mb-9 rounded-xl border border-gray-200">
        <div className="flex bg-gray-50 rounded-t-xl">
          <div className="gauche text-lg pl-6 py-3">
            <b>Système</b>
          </div>
        </div>
        <div className="flex p-6 text-sm">
          <div className="gauche text-gray-400">
            <p>Langue</p>
          </div>
          <div className="droite">
            <select className="w-36">
              <option value="Anglais">Anglais</option>
              <option value="Français">Français</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
    </div>
  );
};

export default MonProfil;