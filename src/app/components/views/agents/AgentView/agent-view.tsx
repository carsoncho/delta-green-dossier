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

export default function AgentView(props: { agent: IAgent }) {
  const isMobile = useIsMobile();
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
