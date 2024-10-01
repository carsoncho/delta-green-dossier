"use client";

import { useState, useTransition } from "react";
import { createAgent } from "../api/create-agent";
import { IAgent } from "@/types/agent";

type UseCreateAgentOptions = {
  onSuccess?: (agent: IAgent) => void;
  onError?: (error: any) => void;
};

export function useCreateAgent({
  onSuccess,
  onError,
}: UseCreateAgentOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const createAgentAction = () => {
    setIsLoading(true);

    startTransition(async () => {
      try {
        const response = await createAgent();

        if (!response.success || !response.agent)
          throw new Error("Failed to delete agent");

        onSuccess?.(response.agent);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return { createAgentAction, isLoading: isLoading || isPending };
}
