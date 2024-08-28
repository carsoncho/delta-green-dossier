"use client";

import { IAgent } from "@/types/agent";
import AgentView from "@/app/components/views/agents/AgentView/agent-view";
import { useEffect, useState } from "react";
import Link from "next/link";

interface IAgentParams {
  params: {
    agent: string;
  };
}

const fetchAgent = async (props: IAgentParams) => {
  const res = await fetch(`/api/agents/${props.params.agent}`);
  const agent = await res.json();
  return agent;
};

export default function Page(props: IAgentParams) {
  const [agent, setAgent] = useState<IAgent>({} as IAgent);

  useEffect(() => {
    fetchAgent(props).then((res: { data: IAgent }) => {
      setAgent(res.data);
    });
  }, [props]);

  if (!agent || Object.keys(agent).length === 0) return <p>Waiting...</p>;

  if (!agent.hasCompletedCreation) {
    return (
      <div className="prose prose-white">
        <p>
          Agent Not Ready! The current agent is not accessible because its
          dossier is missing a critical detail. Return to the agent dossier to
          fill in the rest of the agents details.
        </p>
        <Link href={`/agent/${agent._id}/builder`}>Complete agent dossier</Link>
      </div>
    );
  }
  return <AgentView agent={agent} />;
}
