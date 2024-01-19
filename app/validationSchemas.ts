import { z } from "zod";

export const createIssueSchema = z.object({
  // se toma como base el esquema de schema.prisma
  // solo tiene las propiedades que no se generan por defecto
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Title is required."),
});
