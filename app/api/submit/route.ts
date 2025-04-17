import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  numeroTelefono: z
    .string()
    .min(8, "Mínimo 8 dígitos")
    .regex(/^[0-9]+$/, "Solo números"),
  foto: z
    .any()
    .refine((file) => file instanceof File, "La foto es obligatoria"),
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse({ ...data, foto: formData.get("foto") });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.errors.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });
    const params = new URLSearchParams({
      errors: JSON.stringify(errors),
    });
    return NextResponse.redirect(new URL(`/?${params}`, request.url));
  }

  console.log("Usuario Recibido:", parsed.data);
  return NextResponse.redirect(new URL("/", request.url));
}
