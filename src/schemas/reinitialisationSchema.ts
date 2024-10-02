import {z} from 'zod';

export const reinitialisationSchema = z.object({
    password: z.string()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères.")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule.")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.")
      .regex(/[_-]/, "Le mot de passe doit contenir au moins des tirets."),
    confirmPassword: z.string().min(6, "La confirmation du mot de passe est requise."),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
});