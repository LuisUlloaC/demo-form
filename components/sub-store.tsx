import { Input } from "./input";
import { SubmitButton } from "./button";
import { sendValues } from "@/actions/test-values";

export function SubStoreComponent({ id }: { id: string }) {

  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <h4>ID: {id}</h4>
      <Input id={id} name="name" label="Name"/>
      <Input id={id} name="value" label="Value"/>
      <Input id={id} name="c" label="C"/>
      <SubmitButton id={id} action={sendValues} />
    </div>
  );
}
