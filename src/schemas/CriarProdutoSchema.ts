

import { z } from "zod";

export const CriarProductSchema = z.object({
    amount: z.string(),
    name: z.string(),
    value: z.string(),
    id: z.string()
})