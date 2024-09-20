import Card from "@/app/components/ui/card/card";
import { AgentName } from "@/app/components/utils/agent-utils";
import { IAgent } from "@/types/agent";
import Link from "next/link";
import { getAgents } from "../api/get-agents";

export default async function AgentsList() {
  const agents = await getAgents();
  /**
   * @todo: rework card to use shadcn card.
   */
  const agentsList = agents.map((agent: IAgent) => (
    <Link key={agent._id.toString()} href={`/agent/${agent._id}`}>
      <Card title={AgentName(agent)} body={agent.physicalDescription} />
    </Link>
  ));

  return (
    <div className="agent-list grid grid-cols-1 gap-4 md:grid-cols-6">
      {agentsList}
    </div>
  );
}
