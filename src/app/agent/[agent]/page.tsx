import { getAgent } from "@/features/agents/api/get-agent";
import AgentView from "@/features/agents/components/agent-view";

interface IAgentParams {
  params: {
    agent: string;
  };
}

export default async function Page(props: IAgentParams) {
  const agent = await getAgent(props.params.agent);
  if (agent === null) return null;

  return <AgentView agent={JSON.parse(JSON.stringify(agent))} />;
}
