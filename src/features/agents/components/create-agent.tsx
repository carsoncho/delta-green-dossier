"use client";

import { useFormStatus } from "react-dom";
import { createAgentAction } from "../actions/create-agent";
import { Button } from "@/app/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Create new Agent
    </Button>
  );
}

export default function CreateAgent() {
  const handleClick = () => {
    alert("todo: implement create premade agent");
  };
  return (
    <>
      <form action={createAgentAction}>
        <SubmitButton />
      </form>
      <Button onClick={handleClick}>Create Premade Agent</Button>
    </>
  );
}
