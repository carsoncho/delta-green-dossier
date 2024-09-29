"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteAgentAction } from "../actions/delete-agent";

type UseDeleteAgentOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export function useDeleteAgent({
  onSuccess,
  onError,
}: UseDeleteAgentOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition(); // To handle transitions
  const { toast } = useToast();

  const deleteAgent = (agentId: string) => {
    setIsLoading(true);

    startTransition(async () => {
      try {
        const response = await deleteAgentAction(agentId); // Call the server action

        if (!response.success) throw new Error("Failed to delete agent");

        toast({
          title: "Success",
          description: "Agent successfully deleted.",
        });

        onSuccess?.();
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
        });
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return { deleteAgent, isLoading: isLoading || isPending };
}
