"use client";

import { IAgent } from "@/types/agent";
import React, { createContext, useContext, useState } from "react";

interface AgentContextType {
  agent: IAgent | null;
  setAgent: React.Dispatch<React.SetStateAction<IAgent | null>>;
}

const AgentContext = createContext<AgentContextType>({
  agent: null,
  setAgent: () => {},
});

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }
  return context;
};

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [agent, setAgent] = useState<IAgent | null>(null);

  return (
    <AgentContext.Provider value={{ agent, setAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
