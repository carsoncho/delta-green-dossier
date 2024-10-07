"use client";

import { useState, useTransition } from "react";
import { IAgent } from "@/types/agent";
import { updateAgent } from "../api/update-agent";

type UseUpdateAgentOptions = {
  onSuccess?: (agent: IAgent) => void;
  onError?: (error: any) => void;
};

export function useUpdateAgent({
  onSuccess,
  onError,
}: UseUpdateAgentOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const updateAgentAction = (agent: IAgent) => {
    setIsLoading(true);

    startTransition(async () => {
      try {
        console.log("trying startTransition from updateAgentAction");
        const response = await updateAgent(agent);

        if (!response.success || !response.agent)
          throw new Error("Failed to update agent");

        onSuccess?.(response.agent);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return { updateAgentAction, isLoading: isLoading || isPending };
}
