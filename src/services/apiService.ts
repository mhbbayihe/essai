import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Remplacez par l'URL de votre API
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Connexion d'un utilisateur
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/users/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Stocker le token et l'ID utilisateur dans localStorage si la connexion est réussie
    const { token, user } = response.data; // Assurez-vous que l'API renvoie userId
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify( user)); // Stockage de l'ID utilisateur

    return response.data; // Renvoie les données de la réponse
  } catch (error: any) {
    console.error('Erreur lors de la connexion :', error.response ? error.response.data : error.message);
    throw new Error('Échec de la connexion. Vérifiez vos identifiants.'); // Message d'erreur convivial
  }
};

// Vérifier si l'email est dans la base de données
export const searchEmail = async (data: { email: string }) => {
  try {
    const response = await api.get(`/users/search/${data.email}`);
    return response.data; // Retourne les données de l'utilisateur
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'email :', error);
    throw new Error('Erreur lors de la recherche de l\'email. Veuillez réessayer.');
  }
};

// Inscription d'un utilisateur
export const registerUser = async (RegisterBody: {
  email: string;
  password: string;
  locale: string; // Correction ici
  individual_profile: {
    first_name: string;
    last_name: string;
  };
}) => {
  try {
    const response = await api.post('/users/signup', RegisterBody);
    return response.data;
  } catch (error:any) {
    console.error('Erreur lors de l\'inscription:', error.response ? error.response.data : error.message);
    throw new Error('Échec de l\'inscription. Vérifiez vos informations.'); // Message d'erreur convivial
  }
};

// Validation du nouveau mot de passe
export const resetPassword = async (data: { password: string }) => {
  const token = localStorage.getItem('token');

  if (!token) {
      throw new Error('Token manquant. Veuillez vous connecter.');
  }

  try {
      const response = await api.post('/users/resetPassword', data, {
          headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      return response.data; // Assurez-vous que cette réponse correspond à ce qui est attendu
  } catch (error: any) {
      console.error('Erreur lors de la réinitialisation du mot de passe :', error);
      const errorResponse = error.response?.data;
      if (errorResponse) {
          throw new Error(errorResponse.message || 'Échec de la réinitialisation du mot de passe. Veuillez réessayer.');
      }
      throw new Error('Échec de la réinitialisation. Veuillez réessayer.'); // Message d'erreur générique
  }
};

// Récupérer l'id de l'utilisateur
export const fetchUserInfo = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
      console.error('Token manquant. Veuillez vous connecter.');
      return null; // Retourner null si le token est manquant
  }

  try {
      const response = await api.get('/whoAmI', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log('Informations de l\'utilisateur:', response.data);
      console.log('Token:', token);
      const id = response.data; // Assurez-vous que response.data contient l'ID
      console.log('je suis:', id);
      
      // Stockez l'ID dans le localStorage
      localStorage.setItem('id', id);
      return response.data;
  } catch (error: any) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error.response?.data || error.message);
      return null; // Retourner null en cas d'erreur
  }
};

export  const fetchUserProfile = async () => {
  const token = localStorage.getItem('token'); // Récupérer le token
  const userstorage = localStorage.getItem('user');
  const user= JSON.parse(userstorage as string);
  if (!token) {
    throw new Error('Token manquant. Veuillez vous connecter.');
  }

  try {
    const response = await api.get(`/users/${user?.id}/individual-profiles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    console.log('Données du profil utilisateur :', response.data); // Afficher les données
 

    return response.data;
  // Retourne les données du profil
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    throw new Error('Échec de la récupération du profil. Veuillez réessayer.');
  }
};

//modifier les informations de l'utilisateur
type UpdateUserData = {
  mobile_phone: string;
  individual_profile: {
    first_name: string;
    last_name: string;
    birth_date: string;
  };
};

export const updateUser = async (updateBody: {
    first_name: string;
    last_name: string;
    birth_date: string;
}) => {
  const token = localStorage.getItem('token'); // Récupérer le token
  const userstorage = localStorage.getItem('user');
  const user= JSON.parse(userstorage as string);

  if (!token) {
      throw new Error('Token manquant. Veuillez vous connecter.');
  }

  try {
      const response = await api.patch(`/individual-profiles/${user?.individual_profile.id}`, updateBody, {
          headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      return response.data; // Assurez-vous que cette réponse correspond à ce qui est attendu
  } catch (error: any) {
      console.error('Erreur lors de la modification :', error);
      const errorResponse = error.response?.data;
      if (errorResponse) {
          throw new Error(errorResponse.message || 'Échec de la modification. Veuillez réessayer.');
      }
      throw new Error('Échec de la modification. Veuillez réessayer.'); // Message d'erreur générique
  }
};