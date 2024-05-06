import { z } from "zod";

export const CriarPedidoSchema = z.object({
  company: z.string(),
  cycle: z.string(),
  value: z.string(),
});
