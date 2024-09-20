"use client";

import Carousel from "../carousel";
import AgentAttributes from "./agent-attributes";
import AgentProfileInfo from "./agent-profile-info";
import CombatActionsList from "./combat-actions-list";
import DerivedAttributes from "./derived-attributes";
import PsychologicalData from "./psychological-data";
import SkillsList from "./skills-list";

export default function CarouselView({ data }) {
  return (
    <Carousel>
      <div className="slide slide-1">
        <AgentProfileInfo agent={data} />
        <AgentAttributes agent={data} />
        <DerivedAttributes agent={data} />
      </div>
      <SkillsList className="slide slide-2" agent={data} />
      <PsychologicalData className="slide slide-3" agent={data} />
      <CombatActionsList />
    </Carousel>
  );
}
