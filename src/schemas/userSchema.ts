import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(1, "Le prénom est requis"),
    subname: z.string().min(1, "Le nom est requis"),
    // phone: z.string().regex(/^\d{10}$/, "Le numéro de téléphone doit contenir 10 chiffres"),
    birthday: z.string().optional(),
});