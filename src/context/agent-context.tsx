"use client";

import { IAgent } from "@/types/agent";
import React, { createContext, useContext, useState } from "react";

interface AgentContextType {
  agent: IAgent;
  setAgent: React.Dispatch<React.SetStateAction<IAgent>>;
}

const AgentContext = createContext<AgentContextType>({
  agent: {} as IAgent,
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
  const [agent, setAgent] = useState<IAgent>({} as IAgent);

  return (
    <AgentContext.Provider value={{ agent, setAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
