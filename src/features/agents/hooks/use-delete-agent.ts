"use client";

import { useState, useTransition } from "react";
import { deleteAgent } from "../api/delete-agent";

type UseDeleteAgentOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export function useDeleteAgent({
  onSuccess,
  onError,
}: UseDeleteAgentOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deleteAgentAction = (agentId: string) => {
    setIsLoading(true);

    startTransition(async () => {
      try {
        const response = await deleteAgent(agentId);

        if (!response.success) throw new Error("Failed to delete agent");

        onSuccess?.();
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return { deleteAgentAction, isLoading: isLoading || isPending };
}
