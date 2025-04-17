"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ClearStorage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("errors")) {
      ["nombre", "apellido", "numeroTelefono"].forEach((key) =>
        localStorage.removeItem(key)
      );
    }
  }, [searchParams]);

  return null;
}
