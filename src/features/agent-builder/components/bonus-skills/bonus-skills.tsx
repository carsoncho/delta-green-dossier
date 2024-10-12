import { useAgentContext } from "@/context/agent-context";
import { useState } from "react";
import { Button } from "@/app/components/ui/button/button";
import { baseSkills } from "../../../../../data/skills";
import { Skill } from "@/types/skills";
import { GetSkillName } from "@/utils/agent-utils";
import { Profession } from "@/types/profession";

export default function BonusSkills(profession: Profession) {
  const { agent, setAgent } = useAgentContext();
  const [remainingIncrements, setRemainingIncrements] = useState(8);
  const [incrementedSkills, setIncrementedSkills] = useState<Set<string>>(
    new Set()
  );

  // const allAgentSkills: { [key: string]: number } = {};
  // agent.skills.forEach((skill) => {
  //   allAgentSkills[skill.name] = skill.value;
  // });

  const mergedSkills = baseSkills.map((skill) => {
    const professionSkills = profession.professionalSkills;
    return {
      name: skill.name,
      value: skill.baseValue,
    };
  });

  const handleIncrement = (skillName: string) => {
    if (remainingIncrements <= 0) return;

    const updatedSkills = mergedSkills.map((skill) => {
      if (skill.name === skillName && skill.value < 80) {
        setRemainingIncrements((prev) => prev - 1);
        setIncrementedSkills((prev) => new Set(prev).add(skillName));
        return { ...skill, value: skill.value + 20 };
      }
      return skill;
    });

    updateAgentSkills(updatedSkills);
  };

  const handleDecrement = (skillName: string) => {
    if (!incrementedSkills.has(skillName)) return;

    const updatedSkills = mergedSkills.map((skill) => {
      if (
        skill.name === skillName &&
        skill.value > allSkills[skill.name].base
      ) {
        setRemainingIncrements((prev) => prev + 1);
        setIncrementedSkills((prev) => {
          const updatedSet = new Set(prev);
          if (skill.value - 20 === allSkills[skill.name].base) {
            updatedSet.delete(skillName);
          }
          return updatedSet;
        });
        return { ...skill, value: skill.value - 20 };
      }
      return skill;
    });

    updateAgentSkills(updatedSkills);
  };

  const updateAgentSkills = (updatedSkills: Skill[]) => {
    setAgent((prevAgent) => ({
      ...prevAgent,
      skills: updatedSkills,
    }));
  };

  return (
    <div>
      <p>Remaining Increments: {remainingIncrements}</p>
      <ul>
        {mergedSkills.map((skill, index) => (
          <li key={index} className="flex items-center my-2">
            <Button
              onClick={() => handleDecrement(skill.name)}
              disabled={
                !incrementedSkills.has(skill.name) ||
                skill.value <= baseSkills[index].baseValue
              }
              className="mr-2"
            >
              -
            </Button>
            <span className="w-32">
              {skill.name}: {skill.value}%
            </span>
            <Button
              onClick={() => handleIncrement(skill.name)}
              disabled={skill.value >= 80 || remainingIncrements <= 0}
              className="ml-2"
            >
              +
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
