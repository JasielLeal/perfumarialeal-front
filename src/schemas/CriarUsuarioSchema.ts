import { z } from "zod";

export const CriarUsuarioSchema = z.object({
    name: z.string().min(3, 'Minimo de 3 letras'),
    email: z.string().email({ message: 'Email invalido' }),
    password: z.string().min(6, 'A senha não é valida'),
    avatar: z.string()
})