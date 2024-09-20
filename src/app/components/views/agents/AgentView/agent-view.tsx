"use client";

import useIsMobile from "../../../utils/is-mobile";
import AgentAttributes from "../../../ui/agent/agent-attributes";
import AgentProfileInfo from "../../../ui/agent/agent-profile-info";
import CarouselView from "../../../ui/agent/carousel-view";
import CombatActionsList from "../../../ui/agent/combat-actions-list";
import DerivedAttributes from "../../../ui/agent/derived-attributes";
import PsychologicalData from "../../../ui/agent/psychological-data";
import SkillsList from "../../../ui/agent/skills-list";
import { IAgent } from "@/types/agent";
import { getAgent } from "@/features/agents/api/get-agent";

export default function AgentView(props: { agentId: string }) {
  const isMobile = useIsMobile();
  const agent = getAgent(props.agentId);

  if (agent === null) {
    return <p>Sorry no agent found</p>;
  } else {
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
}
