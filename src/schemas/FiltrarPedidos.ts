import { z } from "zod";

export const FiltrarPedidoSchema = z.object({
    name: z.string(),
})