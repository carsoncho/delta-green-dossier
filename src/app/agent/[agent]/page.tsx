"use server";
import { getAgent } from "@/features/agents/api/get-agent";
import AgentView from "@/features/agents/components/agent-view";

export default async function Page({ params }: { params: { agent: string } }) {
  const agentId = params.agent;
  const foundAgent = await getAgent(agentId);
  if (!foundAgent) return <p>No agent</p>;

  return <AgentView agent={foundAgent} />;
}
