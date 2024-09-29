"use client";

import { useFormStatus } from "react-dom";
import { createAgent } from "../actions/create-agent";
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
  return (
    <form action={createAgent}>
      <SubmitButton />
    </form>
  );
}
