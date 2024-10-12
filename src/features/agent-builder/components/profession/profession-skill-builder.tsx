"use client";

import { Button } from "@/app/components/ui/button";
import { useAgentContext } from "@/context/agent-context";
import { Profession } from "@/types/profession";
import { PlayerSkill, Skill } from "@/types/skills";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

type ProfessionSkillBuilderProps = {
  activeProfession: Profession;
  handleCancelSelection: () => void;
};

export default function ProfessionSkillBuilder(
  props: ProfessionSkillBuilderProps
) {
  const activeProfession = props.activeProfession;
  const { agent, setAgent } = useAgentContext();

  const [professionalSkills, setProfessionalSkills] = useState([] as Skill[]);
  const [additionalSkills, setAdditionalSkills] = useState([] as Skill[]);
  const [selectedAdditionalSkills, setSelectedAdditionalSkills] = useState<
    Set<number>
  >(new Set());

  // On mount, initialize professional skills
  useEffect(() => {
    const proSkills = activeProfession.professionalSkills.map((skill) => ({
      ...skill,
      currentValue: skill.value,
    }));
    setProfessionalSkills(proSkills);
  }, [activeProfession]);

  if (!agent) return null;

  // Handle input change for professional skills
  const handleProfessionalSkillInputChange = (
    skillIndex: number,
    value: string
  ) => {
    setProfessionalSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[skillIndex] = {
        ...updatedSkills[skillIndex],
        userInput: value,
      };
      return updatedSkills;
    });
  };

  // Handle input change for additional skills
  const handleAdditionalInputChange = (skillId: number, value: string) => {
    setAdditionalSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === skillId ? { ...skill, userInput: value } : skill
      )
    );
  };

  // Handle checkbox change for additional skills
  const handleCheckboxChange = (skillId: number, isChecked: boolean) => {
    if (isChecked) {
      // Add skill to selectedAdditionalSkills set
      setSelectedAdditionalSkills((prevSelectedSkills) => {
        const updatedSkills = new Set(prevSelectedSkills);
        updatedSkills.add(skillId);
        return updatedSkills;
      });

      // Add skill to additionalSkills state with an initial empty userInput
      const skillToAdd = {
        ...activeProfession.additionalSkills!.find(
          (skill) => skill.id === skillId
        ),
        userInput: "",
      };
      setAdditionalSkills((prevSkills) => [...prevSkills, skillToAdd]);
    } else {
      // Remove skill from selectedAdditionalSkills set
      setSelectedAdditionalSkills((prevSelectedSkills) => {
        const updatedSkills = new Set(prevSelectedSkills);
        updatedSkills.delete(skillId);
        return updatedSkills;
      });

      // Remove skill from additionalSkills state based on skillId
      setAdditionalSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== skillId)
      );
    }
  };

  // Render list of professional skills
  const professionalSkillsList = professionalSkills.map((skill, index) => (
    <div key={index}>
      <label htmlFor={skill.name}>{skill.name}</label>
      {skill.requiresInput && (
        <input
          name={skill.name}
          type="text"
          value={skill?.userInput || ""}
          onChange={(e) =>
            handleProfessionalSkillInputChange(index, e.target.value)
          }
          placeholder={skill.inputLabel}
          className="text-black"
        />
      )}
      <span>{skill.value}%</span>
    </div>
  ));

  // Render list of additional skills
  const additionalSkillsList = activeProfession.additionalSkills?.map(
    (skill) => {
      const isChecked = selectedAdditionalSkills.has(skill.id);
      // Find the corresponding skill in `additionalSkills` by matching the `id`
      const skillData = additionalSkills.find(
        (additionalSkill) => additionalSkill.id === skill.id
      );

      return (
        <div key={skill.id}>
          <input
            type="checkbox"
            id={`checkbox-${skill.id}`}
            checked={isChecked}
            onChange={(e) => handleCheckboxChange(skill.id, e.target.checked)}
          />
          <label htmlFor={`checkbox-${skill.id}`}>{skill.name}</label>
          {skill.requiresInput && (
            <input
              type="text"
              value={skillData?.userInput || ""}
              onChange={(e) =>
                handleAdditionalInputChange(skill.id, e.target.value)
              }
              placeholder={skill.inputLabel}
              disabled={!isChecked}
              className="text-black"
            />
          )}
          <span>{skill.value}%</span>
        </div>
      );
    }
  );

  // Handle cancel action
  const handleCancel = () => {
    props.handleCancelSelection();
    setProfessionalSkills([]);
    setAdditionalSkills([]);
    setSelectedAdditionalSkills(new Set());
  };

  const setProfessionAndSkills = () => {
    const updatedAgent = {
      ...agent,
      profession: activeProfession,
      skills: [...professionalSkills, ...additionalSkills],
    };

    setAgent(updatedAgent);
    console.log(updatedAgent);
  };

  // Check if all professional skills that require input have values
  const areProfessionalSkillsFilled = professionalSkills.every((skill) => {
    return (
      !skill.requiresInput || (skill.userInput && skill.userInput.trim() !== "")
    );
  });

  // Check if all required additional skills are selected
  const isAdditionalSkillsCountValid =
    selectedAdditionalSkills.size === activeProfession.rule?.count;

  // Disable the "Set Profession" button if required conditions are not met
  const isButtonDisabled =
    !areProfessionalSkillsFilled || !isAdditionalSkillsCountValid;

  return (
    <div>
      <h1 className="font-bold text-xl">
        Active Profession: {activeProfession.name}
      </h1>
      <Button onClick={handleCancel}>
        <MdCancel className="mr-2 h-4 w-4" /> Cancel
      </Button>
      <hr />
      <div>
        <p>Base Skills:</p>
        {professionalSkillsList}
      </div>
      {activeProfession.rule && (
        <p>
          <strong>Rule:</strong> {activeProfession.rule.text}
        </p>
      )}
      {additionalSkillsList && additionalSkillsList.length > 0 && (
        <div>
          <p>Additional Skills:</p>
          {additionalSkillsList}
        </div>
      )}
      <Button onClick={setProfessionAndSkills} disabled={isButtonDisabled}>
        Set Profession
      </Button>
    </div>
  );
}
