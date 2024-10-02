import {z} from 'zod';

export const entrepriseSchema = z.object({
    name: z.string().min(1, { message: "Le nom de l'entreprise est requis." }),
    country: z.string().min(1, { message: "Le pays est requis." }),
    phone: z.string().min(1,"Le numero de téléphone est requis."),
});