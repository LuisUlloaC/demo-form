"use client";

import { sendValues } from "@/actions/test-values";
import { useMainStore } from "@/stores/form-store";

interface SubmitButtonProps<
  Data = unknown,
  Result = { success: boolean; errors?: any[] }
> {
  id: string;
  action: (data: Data) => Promise<Result>;
}

export function SubmitButton({ id, action }: SubmitButtonProps) {
  const main = useMainStore();
  const store = main.getStore(id)!;

  const handleClick = async () => {
    const fields = store.getState().fields;
    const data = fields.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );

    const result = await action(data);

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
