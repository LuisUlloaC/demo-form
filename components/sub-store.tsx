import { useMainStore } from "@/stores/form-store";
import { useRef } from "react";

export function SubStoreComponent({ id }: { id: string }) {
  const storeRef = useRef(() => {
    const main = useMainStore.getState();
    if (!main.getStore(id)) {
      main.createStore(id, {name: "Store", value: "0"});
    }
    return main.getStore(id)!;
  });

  const subStore = storeRef.current();

  if (!subStore) return <div>No store found for ID: {id}</div>;

  const name = subStore((state) => state.name);
  const value = subStore((state) => state.value);
  const setName = subStore((state) => state.setName);
  const setValue = subStore((state) => state.setValue);

  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <h4>ID: {id}</h4>
      <p>Name: {name}</p>
      <p>Value: {value}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}