"use server";

import { z } from "zod";

const formSchema = z.object({
  id: z.string().min(1, { message: "ID es obligatorio" }),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  value: z.string().min(1, { message: "El valor es obligatorio" }),
});

export type FormData = z.infer<typeof formSchema>;

export async function sendValues(data: unknown) {
  try {
    const parsedData = formSchema.parse(data);
    console.log("Server Action recibió datos válidos:", parsedData);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      console.error("Errores de validación:", formattedErrors);
      return { success: false, errors: formattedErrors };
    }
    return { success: false, error: "Hubo un error inesperado" };
  }
}
