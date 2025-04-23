import { Input } from "./input";
import { SubmitButton } from "./button";

export function SubStoreComponent({ id }: { id: string }) {

  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <h4>ID: {id}</h4>
      <Input id={id} name="name" label="Name"/>
      <Input id={id} name="value" label="Value"/>
      <SubmitButton id={id}  />
    </div>
  );
}
