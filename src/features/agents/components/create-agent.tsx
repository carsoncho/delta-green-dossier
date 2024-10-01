"use client";

import { Button } from "@/app/components/ui/button";
import { useCreateAgent } from "../hooks/use-create-agent";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CreateAgent() {
  const { toast } = useToast();
  const router = useRouter();

  const { createAgentAction, isLoading } = useCreateAgent({
    onSuccess: (agent) => {
      router.push(`/agent/${agent._id}/builder`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleStandardClick = () => {
    if (!isLoading) {
      createAgentAction();
    }
  };

  const handlePremadeClick = () => {
    alert("todo: implement create premade agent");
  };
  return (
    <>
      <Button onClick={handleStandardClick} disabled={isLoading}>
        Create new Agent
      </Button>
      <Button onClick={handlePremadeClick} disabled={isLoading}>
        Create Premade Agent
      </Button>
    </>
  );
}
