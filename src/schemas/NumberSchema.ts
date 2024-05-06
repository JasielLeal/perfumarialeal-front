import { z } from "zod";

export const NumberSchema = z.string().regex(/^\d*\.?\d*$/, {
  message: "Por favor, insira um número válido.",
});
