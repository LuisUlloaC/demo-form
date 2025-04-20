"use client";
import { useFormStore } from "@/stores/form-store";
import { useShallow } from 'zustand/react/shallow'


export default function Button() {
    const {
        nombre, apellido, numeroTelefono, foto
    } = useFormStore(
        useShallow((state) => ({
            nombre: state.nombre.value,
            apellido: state.apellido.value,
            numeroTelefono: state.numeoTelefono.value,
            foto: state.foto.value
        })
    ))
    return <button type="submit">Enviar</button>;
}
