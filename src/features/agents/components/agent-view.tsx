"use client";

import useIsMobile from "@/utils/is-mobile";
import AgentAttributes from "@/app/components/ui/agent/agent-attributes";
import AgentProfileInfo from "@/app/components/ui/agent/agent-profile-info";
import CarouselView from "@/app/components/ui/agent/carousel-view";
import CombatActionsList from "@/app/components/ui/agent/combat-actions-list";
import DerivedAttributes from "@/app/components/ui/agent/derived-attributes";
import PsychologicalData from "@/app/components/ui/agent/psychological-data";
import SkillsList from "@/app/components/ui/agent/skills-list";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { useAgentContext } from "@/context/agent-context";
import { IAgent } from "@/types/agent";

export default function AgentView(props: { agent: IAgent }) {
  const { agent, setAgent } = useAgentContext();
  const isMobile = useIsMobile();

  if (agent === null) {
    setAgent(props.agent);
    return <p>No agent found</p>;
  }

  if (!agent.hasCompletedCreation) {
    return (
      <div className="prose">
        <p>
          Agent Not Ready! The current agent is not accessible because its
          dossier is missing a critical detail. Return to the agent dossier to
          fill in the rest of the agents details.
        </p>
        <Link href={`/agent/${agent._id}/builder`}>
          <Button>Complete agent dossier</Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      {isMobile ? (
        <CarouselView data={agent} />
      ) : (
        <div className="desktop-layout w-full">
          <AgentProfileInfo agent={agent} />
          <AgentAttributes agent={agent} />
          <DerivedAttributes agent={agent} />
          <SkillsList agent={agent} />
          <CombatActionsList />
          <PsychologicalData agent={agent} />
        </div>
      )}
    </div>
  );
}
