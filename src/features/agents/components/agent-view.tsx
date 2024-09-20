"use client";

import useIsMobile from "@/app/components/utils/is-mobile";
import AgentAttributes from "@/app/components/ui/agent/agent-attributes";
import AgentProfileInfo from "@/app/components/ui/agent/agent-profile-info";
import CarouselView from "@/app/components/ui/agent/carousel-view";
import CombatActionsList from "@/app/components/ui/agent/combat-actions-list";
import DerivedAttributes from "@/app/components/ui/agent/derived-attributes";
import PsychologicalData from "@/app/components/ui/agent/psychological-data";
import SkillsList from "@/app/components/ui/agent/skills-list";
import { getAgent } from "../api/get-agent";
import Link from "next/link";
import { IAgent } from "@/types/agent";
import { Button } from "@/app/components/ui/button";

export default function AgentView(props: { agent: IAgent }) {
  const isMobile = useIsMobile();

  if (props.agent === null) {
    return <p>No agent found</p>;
  }

  if (!props.agent.hasCompletedCreation) {
    return (
      <div className="prose">
        <p>
          Agent Not Ready! The current agent is not accessible because its
          dossier is missing a critical detail. Return to the agent dossier to
          fill in the rest of the agents details.
        </p>
        <Link href={`/agent/${props.agent._id}/builder`}>
          <Button>Complete agent dossier</Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      {isMobile ? (
        <CarouselView data={props.agent} />
      ) : (
        <div className="desktop-layout w-full">
          <AgentProfileInfo agent={props.agent} />
          <AgentAttributes agent={props.agent} />
          <DerivedAttributes agent={props.agent} />
          <SkillsList agent={props.agent} />
          <CombatActionsList />
          <PsychologicalData agent={props.agent} />
        </div>
      )}
    </div>
  );
}
