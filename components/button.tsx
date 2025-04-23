"use client";

import { sendValues } from "@/actions/test-values";
import { useMainStore } from "@/stores/form-store";

interface SubmitButtonProps {
  id: string;
}

export function SubmitButton({ id }: SubmitButtonProps) {
  const main = useMainStore();
  const store = main.getStore(id)!;

  const handleClick = async () => {
    const state = store.getState().fields;
    const data = { ...state };
    const result = await sendValues(data);

    if (!result.success && result.errors) {
      store.setState((s) => ({ ...s, errors: result.errors }));
    } else {
      store.setState((s) => ({ ...s, errors: result.errors }));
      console.log("Envío correcto", result);
    }
    console.log("DATA: ", store.getState());
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Enviar
    </button>
  );
}
