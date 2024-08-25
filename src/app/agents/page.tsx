"use client";
import Link from "next/link";
import { AgentName } from "@/components/utils/agent-utils";
import { IAgent } from "@/types/agent";
import { useState, useEffect } from "react";
import Card from "../components/ui/card/card";
import { useRouter } from "next/navigation";

export default function Agents() {
  const router = useRouter();

  const handleClick = (agent: IAgent) => {
    router.push(`/agent/${agent._id}`);
  };

  const fetchAgents = async () => {
    const res = await fetch("/api/agents");
    const agents = await res.json();
    return agents;
  };
  const [agents, setAgents] = useState<IAgent[]>([]);

  useEffect(() => {
    fetchAgents().then((res: { success: boolean; data: IAgent[] }) => {
      setAgents(res.data);
    });
  }, []);

  if (!agents) return null;

  const agentsList = agents.map((agent: IAgent) => (
    <Card
      key={agent._id.toString()}
      title={AgentName(agent)}
      body={agent.physicalDescription}
      onClick={() => handleClick(agent)}
    />
  ));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-3">
      <div className="agent-list grid grid-cols-1 gap-4 md:grid-cols-6">
        {agentsList}
      </div>
      <div className="fixed w-full bottom-0 p-4">
        <Link
          href="/agent/new"
          className="border-solid border-white border-2 p-4"
        >
          Create new Agent
        </Link>
      </div>
    </main>
  );
}
