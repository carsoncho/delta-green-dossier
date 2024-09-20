"use client";

import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { allSkills } from "data/skills";
import GroupHeader from "./group-header";
import AgentGroupWrapper from "./agent-group-wrapper";
import { Skill } from "@/types/skills";
import { IAgent } from "@/types/agent";

// Define a type that represents the skill names
type SkillName = keyof typeof allSkills;

export default function SkillsList(props: {
  className?: string;
  agent: IAgent;
}) {
  // Define the state with proper typing
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});

  // Type the parameter of the function
  const toggleDrawer = (skill: SkillName) => {
    setOpenDrawers((prevOpenDrawers) => ({
      ...prevOpenDrawers,
      [skill]: !prevOpenDrawers[skill],
    }));
  };

  // Initialize combinedSkills with base skills
  let combinedSkills: Record<SkillName, number> = Object.keys(allSkills).reduce(
    (acc, skill) => {
      const skillName = skill as SkillName;
      acc[skillName] = allSkills[skillName].base;
      return acc;
    },
    {} as Record<SkillName, number>
  );

  // Merge the agent's skills with the default base skills
  combinedSkills = { ...combinedSkills, ...props.agent.skills };

  // Skills list to render
  const skillsList = (Object.keys(combinedSkills) as SkillName[]).map(
    (individualSkill) => {
      // Check if the skill exists in allSkills
      const skillDetails = allSkills[individualSkill];
      if (!skillDetails) {
        console.warn(`Skill "${individualSkill}" is not defined in allSkills.`);
        return null; // Skip rendering if skill is not found
      }

      return (
        <li
          onClick={() => toggleDrawer(individualSkill)}
          key={individualSkill}
          className="p-3"
        >
          <label htmlFor={individualSkill}>{individualSkill}:</label>
          {combinedSkills[individualSkill]}
          <Drawer
            open={!!openDrawers[individualSkill]}
            onClose={() => toggleDrawer(individualSkill)}
            direction="right"
            className="bla bla bla"
            lockBackgroundScroll={true}
          >
            <div className="text-black">
              <h2 className="text-lg">{individualSkill}</h2>
              <p className="mb-4">{skillDetails.description}</p>
              <p>Calculated value:</p>
              <ul>
                <li>Base: {skillDetails.base}</li>
                <li>{combinedSkills[individualSkill]}</li>
              </ul>
            </div>
          </Drawer>
        </li>
      );
    }
  );
  const classes = `skills-list ${props.className || ""}`;
  return (
    <AgentGroupWrapper className={props.className}>
      <GroupHeader heading="Skills" />
      <div className="p-3">
        <ul className={classes}>{skillsList}</ul>
      </div>
    </AgentGroupWrapper>
  );
}
