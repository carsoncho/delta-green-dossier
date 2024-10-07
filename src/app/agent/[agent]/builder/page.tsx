import BuilderWizard from "@/features/agent-builder/components/builder-wizard/builder-wizard";
import { getAgent } from "@/features/agents/api/get-agent";
import { getProfessions } from "@/features/agents/api/get-professions";

export default async function Page({ params }: { params: { agent: string } }) {
  const agentId = params.agent;
  const foundAgent = await getAgent(agentId);
  if (!foundAgent) return <p>No agent</p>;
  const professions = await getProfessions();
  return <BuilderWizard agent={foundAgent} professions={professions} />;
}
