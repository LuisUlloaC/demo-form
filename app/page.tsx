import Input from "@/components/input";
import ClearStorage from "@/components/clearStorage";
import Button from "@/components/button";

interface PageProps {
  searchParams: Promise<{ errors?: string }>;
}

export default async function Page({ searchParams }: PageProps) {

  return (
    <main>
      <ClearStorage />
      <form
        className="bg-gray-400 flex flex-col w-1/3 gap-4 p-4"
      >
        <Input name="nombre" label="Nombre"  />
        <Input name="apellido" label="Apellido" />
        <Input
          name="numeroTelefono"
          label="Teléfono"
          type="tel"
        />
        <Input name="foto" label="Foto" type="file" />
        <Button/>
      </form>
    </main>
  );
}
