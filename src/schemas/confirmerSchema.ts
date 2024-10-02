import {z} from 'zod'

export const comfirmerSchema = z.object({
    inputs: z.array(z.string().regex(/^\d$/, "ne doit que être des lettres")).length(6,"Veillez remplir les 6 champs")
});