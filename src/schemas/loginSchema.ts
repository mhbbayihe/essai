import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, "L'email est requis.").email("Adresse e-mail invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit comporter au moins 8 caractères.")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule.")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.")
    .regex(/[-_]/, "Le mot de passe doit contenir au moins un tiret."),
});