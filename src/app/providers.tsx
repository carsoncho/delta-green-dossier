"use client";

import { AgentProvider } from "@/context/agent-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AgentProvider>{children}</AgentProvider>;
}
