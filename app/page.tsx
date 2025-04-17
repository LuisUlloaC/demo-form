import Input from "@/components/input";
import ClearStorage from "@/components/clearStorage";

interface PageProps {
  searchParams: Promise<{ errors?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { errors: rawErrors } = await searchParams;
  const errors = rawErrors ? JSON.parse(decodeURIComponent(rawErrors)) : {};

  return (
    <main>
      <ClearStorage />
      <form
        action="/api/submit"
        method="post"
        encType="multipart/form-data"
        className="bg-gray-400 flex flex-col w-1/3 gap-4 p-4"
      >
        <Input name="nombre" label="Nombre" error={errors.nombre} />
        <Input name="apellido" label="Apellido" error={errors.apellido} />
        <Input
          name="numeroTelefono"
          label="Teléfono"
          type="tel"
          error={errors.numeroTelefono}
        />
        <Input name="foto" label="Foto" type="file" error={errors.foto} />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}
