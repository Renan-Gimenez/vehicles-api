import { z } from "zod";

export const vehicleSchema = z.object({
  id: z.string().uuid(),
  placa: z.string(),
  chassi: z.string(),
  renavam: z.string(),
  modelo: z.string(),
  marca: z.string(),
  ano: z.number().refine((ano) => ano.toString().length === 4, {
    message: "Year must have 4 digits",
  }),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
