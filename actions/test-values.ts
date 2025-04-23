"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre es obligatorio" }),
  value: z.string().min(1, { message: "El valor es obligatorio" }),
});

export type FormData = z.infer<typeof formSchema>;

const normalizeData = (raw: unknown): Record<string, string> => {
  if (typeof raw !== "object" || raw === null) return {};
  const entries = Object.values(raw as Record<string, any>);
  return entries.reduce<Record<string, string>>((acc, curr) => {
    if (curr && typeof curr === "object" && "name" in curr && "value" in curr) {
      acc[curr.name] = String(curr.value);
    }
    return acc;
  }, {});
};

export async function sendValues(data: unknown) {
  console.log("Server Action recibió:", data);
  const payload = normalizeData(data);
  console.log("Server Action formateó:", payload);

  const result = formSchema.safeParse(payload);

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
