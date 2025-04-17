"use client";

import React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  error?: string;
}

export default function Input({
  name,
  label,
  type = "text",
  error,
}: InputProps) {
  const [value, setValue] = useLocalStorage(name, "");

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
