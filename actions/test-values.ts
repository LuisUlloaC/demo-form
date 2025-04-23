"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es obligatorio" }),
  value: z.string().min(1, { message: "El valor es obligatorio" }),
  c: z.string().min(10, { message: "El valor es obligatorio" }),
});

export type FormData = z.infer<typeof formSchema>;

export async function sendValues(data: unknown) {
  console.log("Server Action recibió:", data);
  const result = formSchema.safeParse(data);

  if (result.success) {
    console.log("Server Action recibió datos válidos:", result.data);
    return { success: true, errors: [] };
  }
  const flatten = result.error.flatten();
  const fieldErrors = flatten.fieldErrors;
  const formatted = Object.entries(fieldErrors).flatMap(([path, msgs]) =>
    (msgs || []).map((message) => ({ path, message }))
  );

  console.error("Errores de validación:", formatted);
  return { success: false, errors: formatted };
}
