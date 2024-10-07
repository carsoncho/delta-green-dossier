"use client";

import { useAgentContext } from "@/context/agent-context";
import { IProfession } from "@/types/professions";
import { useEffect, useState } from "react";
import ProfessionItem from "./profession-item";
import ProfessionSkillInput from "./profession-skill-select";
import { Button } from "@/app/components/ui/button/button";
import { Accordion } from "@/app/components/ui/accordion";
import { CompletedSteps, FormStep } from "../builder-wizard/builder-wizard";
import { MdCancel } from "react-icons/md";
import { Skill } from "@/types/skills";
import { GetSkillName } from "@/utils/agent-utils";
import { IAgent } from "@/types/agent";

enum ProfessionFormStep {
  SelectProfession,
  ProfessionBuilder,
  Review,
}

export default function ProfessionSelector(props: {
  professions: IProfession[];
  completedSteps: CompletedSteps;
  toggleCompletedStep: (step: FormStep) => void;
}) {
  const { agent, setAgent } = useAgentContext();
  const [activeProfession, setActiveProfession] = useState({} as IProfession);
  const [searchFilter, setSearchFilter] = useState("");
  const [formStep, setFormStep] = useState<ProfessionFormStep>(
    ProfessionFormStep.SelectProfession
  );
  const [professionalSkillValues, setProfessionalSkillValues] = useState<{
    [key: string]: string;
  }>({});
  // @todo: Refactor these two into a single list of skills
  const [additionalSkillValues, setAdditionalSkillValues] = useState<{
    [key: string]: string;
  }>({});
  const [selectedAdditionalSkills, setSelectedAdditionalSkills] = useState<
    Set<string>
  >(new Set());

  useEffect(() => {
    // If the agent has a profession, set it as the active profession
    if (agent.profession) {
      setActiveProfession(agent.profession);
      setFormStep(ProfessionFormStep.Review);
    }

    // @todo: set skills based off agent's if aleady found
  }, [agent]);

  useEffect(() => {
    if (formStep !== ProfessionFormStep.ProfessionBuilder) return;

    const selectedSkillsCount = selectedAdditionalSkills.size;

    // Check if the required number of skills has been selected based on the rule count
    const isProfessionFilled =
      selectedSkillsCount >= (activeProfession.rule?.count || 0);
    const isStepCompleted = props.completedSteps?.[FormStep.ProfessionFilled];

    // If profession is filled but the step is not marked as complete, toggle it
    if (isProfessionFilled !== isStepCompleted) {
      props.toggleCompletedStep(FormStep.ProfessionFilled);
    }
  }, [formStep, selectedAdditionalSkills, activeProfession, props, agent]);

  if (!props.professions) return null;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const filteredProfessions = props.professions.filter((profession) =>
    profession.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSelectProfession = (profession: IProfession) => {
    setActiveProfession(profession);
    setFormStep(ProfessionFormStep.ProfessionBuilder);
  };

  const handleCancelSelection = () => {
    setActiveProfession({} as IProfession);
    setFormStep(ProfessionFormStep.SelectProfession);
    setProfessionalSkillValues({});
    setAdditionalSkillValues({});
    setSelectedAdditionalSkills(new Set());
  };

  const setProfessionAndSkills = () => {
    const skillsArray = [] as Skill[];

    // Combine professionalSkills with input values
    activeProfession.professionalSkills.forEach((skill, index) => {
      const uniqueKey = `${skill.name}-${index}`;
      if (skill.requiresInput && professionalSkillValues[uniqueKey]) {
        // Add skill object to the array
        skillsArray.push({
          ...skill,
          userInput: professionalSkillValues[uniqueKey],
        });
      } else {
        // Use the skill name directly
        skillsArray.push({
          ...skill,
        });
      }
    });

    // Only add the selected additionalSkills to the skillsArray
    selectedAdditionalSkills.forEach((uniqueKey) => {
      const index = parseInt(uniqueKey.split("-")[1], 10);
      const skill = activeProfession.additionalSkills[index];
      if (skill) {
        if (skill.requiresInput && additionalSkillValues[uniqueKey]) {
          skillsArray.push({
            ...skill,
            userInput: additionalSkillValues[uniqueKey],
          });
        } else {
          skillsArray.push({
            ...skill,
          });
        }
      }
    });

    console.log("skillsArray", skillsArray);

    // Update the agent's skills and profession
    setAgent((prevAgent) => {
      console.log("setting agent");
      return {
        ...prevAgent,
        skills: skillsArray,
        profession: activeProfession,
      };
    });

    setFormStep(ProfessionFormStep.Review);
  };

  // Separate handlers for professional and additional skill inputs
  const handleProfessionalInputChange = (uniqueKey: string, value: string) => {
    setProfessionalSkillValues((prevValues) => ({
      ...prevValues,
      [uniqueKey]: value,
    }));
  };

  const handleAdditionalInputChange = (uniqueKey: string, value: string) => {
    setAdditionalSkillValues((prevValues) => ({
      ...prevValues,
      [uniqueKey]: value,
    }));
  };

  const areAllInputsFilled = () => {
    const requiredCount = activeProfession.rule?.count || 0;

    // Check professionalSkills: Ensure that any skill with requiresInput has a filled value
    const allProfessionalSkillsFilled =
      activeProfession.professionalSkills.every((skill, index) => {
        if (skill.requiresInput) {
          const uniqueKey = `${skill.name}-${index}`;
          return (
            professionalSkillValues[uniqueKey] &&
            professionalSkillValues[uniqueKey].trim() !== ""
          );
        }
        return true; // If no input is required, it's considered filled
      });

    // Check additionalSkills: Ensure the number of selected skills matches the required count and that all selected skills with requiresInput are filled
    const allAdditionalSkillsFilled =
      selectedAdditionalSkills.size === requiredCount &&
      Array.from(selectedAdditionalSkills).every((uniqueKey) => {
        const index = parseInt(uniqueKey.split("-")[1], 10);
        const skill = activeProfession.additionalSkills[index];
        if (skill?.requiresInput) {
          return (
            additionalSkillValues[uniqueKey] &&
            additionalSkillValues[uniqueKey].trim() !== ""
          );
        }
        return true;
      });

    return allProfessionalSkillsFilled && allAdditionalSkillsFilled;
  };

  const handleCheckboxChange = (uniqueKey: string, isChecked: boolean) => {
    const selectedSkillsCount = selectedAdditionalSkills.size;
    const requiredCount = activeProfession.rule?.count || 0;

    if (isChecked && selectedSkillsCount >= requiredCount) {
      return;
    }

    setSelectedAdditionalSkills((prevSelectedSkills) => {
      const updatedSkills = new Set(prevSelectedSkills);
      if (isChecked) {
        updatedSkills.add(uniqueKey);
        setAdditionalSkillValues((prevValues) => ({
          ...prevValues,
          [uniqueKey]: "", // Initialize with an empty string or some default value
        }));
      } else {
        updatedSkills.delete(uniqueKey);
        setAdditionalSkillValues((prevValues) => {
          const updatedValues = { ...prevValues };
          delete updatedValues[uniqueKey];
          return updatedValues;
        });
      }
      return updatedSkills;
    });
  };

  const getSkillsList = (agent: IAgent) => {
    return agent.skills?.map((skill, index) => {
      const name = GetSkillName(skill);
      return (
        <li key={index}>
          {name}: {skill.value}%
        </li>
      );
    });
    return null;
  };

  if (!agent) return null;

  const renderStep = (step: ProfessionFormStep) => {
    switch (step) {
      case ProfessionFormStep.SelectProfession:
        return (
          <div>
            <input
              type="text"
              value={searchFilter}
              onChange={handleFilterChange}
              placeholder="Filter professions"
              className="mb-4 p-2 border rounded w-full text-black"
            />

            <Accordion type="single" collapsible>
              {filteredProfessions.map((profession: IProfession, index) => (
                <ProfessionItem
                  className={""}
                  key={index}
                  profession={profession}
                  setActiveProfession={handleSelectProfession}
                />
              ))}
            </Accordion>
          </div>
        );
      case ProfessionFormStep.ProfessionBuilder:
        const skills = activeProfession.professionalSkills.map(
          (skill, index) => {
            const uniqueKey = `${skill.name}-${index}`;
            const isInputRequired = skill.requiresInput;

            return (
              <div key={uniqueKey}>
                <label htmlFor={`checkbox-${uniqueKey}`}>{skill.name}</label>

                {isInputRequired && (
                  <input
                    type="text"
                    value={professionalSkillValues[uniqueKey] || ""}
                    onChange={(e) => {
                      handleProfessionalInputChange(uniqueKey, e.target.value);
                    }}
                    placeholder={skill.inputLabel}
                    className="text-black"
                  />
                )}
                <span> {skill.value}%</span>
              </div>
            );
          }
        );

        let additionalSkills: React.ReactNode[] = [];
        if (
          activeProfession.additionalSkills &&
          activeProfession.additionalSkills.length > 0
        ) {
          const selectedSkillsCount = selectedAdditionalSkills.size;
          const requiredCount = activeProfession.rule?.count || 0;

          additionalSkills = activeProfession.additionalSkills.map(
            (skill, index) => {
              const uniqueKey = `additional-${index}`;
              const isChecked = selectedAdditionalSkills.has(uniqueKey);
              const isInputRequired = skill.requiresInput;

              return (
                <div key={uniqueKey}>
                  <input
                    type="checkbox"
                    id={`checkbox-${uniqueKey}`}
                    checked={isChecked}
                    onChange={(e) => {
                      handleCheckboxChange(uniqueKey, e.target.checked);
                    }}
                    disabled={
                      !isChecked && selectedSkillsCount >= requiredCount
                    }
                  />
                  <label htmlFor={`checkbox-${uniqueKey}`}>{skill.name}</label>

                  {isInputRequired && (
                    <input
                      type="text"
                      value={additionalSkillValues[uniqueKey] || ""}
                      onChange={(e) => {
                        handleAdditionalInputChange(uniqueKey, e.target.value);
                      }}
                      placeholder={skill.inputLabel}
                      disabled={!isChecked}
                      className="text-black"
                    />
                  )}
                  <span> {skill.value}%</span>
                </div>
              );
            }
          );
        }

        return (
          <div>
            <h1 className="font-bold text-xl">
              Active Profession: {activeProfession.name}
            </h1>
            <Button onClick={handleCancelSelection}>
              <MdCancel className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <hr />
            <div>
              <p>Base Skills:</p>
              {skills}
            </div>
            {activeProfession.rule && (
              <p>
                <strong>Rule:</strong> {activeProfession.rule.text}
              </p>
            )}
            {additionalSkills.length > 0 && (
              <div>
                <p>Additional Skills:</p>
                {additionalSkills}
              </div>
            )}
            <Button
              onClick={setProfessionAndSkills}
              disabled={!areAllInputsFilled()}
            >
              Set Profession
            </Button>
          </div>
        );
      case ProfessionFormStep.BonusSkills:
      // @todo: return interface for selecting from all skills.
      // The user is allowed to increase a skill by 20 points 8 times.
      // No skill can be increased above an 80
      // A user can optionally increase a skill multiple times.
      case ProfessionFormStep.Review:
        return (
          <div>
            <h1 className="font-bold text-xl">
              Review Profession: {activeProfession.name}
            </h1>

            <Button onClick={handleCancelSelection}>
              <MdCancel className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <hr />
            <ul>{getSkillsList(agent)}</ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="professions-selector mt-4 w-full">
      {renderStep(formStep)}
    </div>
  );
}
