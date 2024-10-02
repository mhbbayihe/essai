import { z } from 'zod';

export const forgotSchema = z.object({
  email: z.string().min(1, "L'email est requis.").email("Adresse e-mail invalide"),
});