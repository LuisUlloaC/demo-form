"use client";

import React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useFormStore } from '@/stores/form-store'

import { useShallow } from 'zustand/react/shallow'

interface InputProps {
  name: string;
  label: string;
  type?: string;
}

export default function Input({
  name,
  label,
  type = "text",
}: InputProps) {
  //const [value, setValue] = useLocalStorage(name, "");
  const {value, setValue, error} = useFormStore(
    useShallow((state) => ({
      value: state[name].value,
      setValue: state[name].setValue,
      error: state[name].error,
    }))
  )

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        name={name}
        type={type}
        value={type === "file" ? undefined : value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
