"use client";

import { useRef } from "react";
import { useMainStore } from "@/stores/form-store";

interface InputProps {
  id: string;
  name: string;
  type?: string;
  label?: string;
}

export function Input({ id, name, type = "text", label }: InputProps) {
  const getStore = () => {
    const main = useMainStore.getState();
    if (!main.getStore(id)) {
      main.createStore(id, [{ name, value: "" }]);
    }
    return main.getStore(id)!;
  };
  const subStore = useRef(getStore).current();

  const fields = subStore((s) => s.fields);
  const errors = subStore((s) => s.errors);
  const setField = subStore((s) => s.setField);

  const field = fields.find((f) => f.name === name);
  const value = field?.value ?? "";
  const errorObj = errors.find((e) => e.path === name);
  const error = errorObj?.message;

  return (
    <div className="relative mb-4">
      {label && (
        <label htmlFor={`${id}-${name}`} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <input
        id={`${id}-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setField(name, e.target.value)}
        className={`w-full border rounded px-3 py-2 
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
