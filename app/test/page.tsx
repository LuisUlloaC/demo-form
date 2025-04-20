"use client"

import { SubStoreComponent } from "@/components/sub-store";
import { useMainStore } from "@/stores/form-store";
import { useEffect } from "react";

export default function Page() {
  const { createStore } = useMainStore();

  useEffect(() => {
    createStore("one", { name: "Store One", value: "100" });
    createStore("two", { name: "Store Two", value: "200" });
  }, []);

  return (
    <div>
      <SubStoreComponent id="one" />
      <SubStoreComponent id="two" />
    </div>
  );
}
