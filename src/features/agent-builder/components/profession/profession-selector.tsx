import { useAgentContext } from "@/context/agent-context";
import { IProfession } from "@/types/professions";
import { useEffect, useState } from "react";
import ProfessionItem from "./profession-item";
import ProfessionSkillInput from "./profession-skill-select";
import { Button } from "@/app/components/ui/button/button";
import { Accordion } from "@/app/components/ui/accordion";
import { CompletedSteps, FormStep } from "../builder-wizard/builder-wizard";

enum ProfessionFormStep {
  SelectProfession = "SELECT_PROFESSION",
  ProfessionBuilder = "PROFESSION_BUILDER",
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
    activeProfession._id
      ? ProfessionFormStep.ProfessionBuilder
      : ProfessionFormStep.SelectProfession
  );
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  // UseEffect moved out of the renderStep function
  useEffect(() => {
    if (formStep !== ProfessionFormStep.ProfessionBuilder) return;

    const selectedSkillsCount = Object.keys(inputValues).length;

    // Check if the required number of skills has been selected based on the rule count
    const isProfessionFilled =
      selectedSkillsCount >= (activeProfession.rule?.count || 0);
    const isStepCompleted = props.completedSteps?.[FormStep.ProfessionFilled];

    // If profession is filled but the step is not marked as complete, toggle it
    if (isProfessionFilled !== isStepCompleted) {
      props.toggleCompletedStep(FormStep.ProfessionFilled);
    }
  }, [formStep, inputValues, activeProfession, props]);

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
  };

  const setProfessionAndSkills = () => {
    const setSkills = {};

    // Combine professionalSkills with input values
    activeProfession.professionalSkills.forEach((skill) => {
      if (skill.requiresInput && inputValues[skill.name]) {
        // Format the skill with the input value, e.g., "Science (Biology)"
        setSkills[`${skill.name} (${inputValues[skill.name]})`] = skill.value;
      } else {
        // Use the skill name directly
        setSkills[skill.name] = skill.value;
      }
    });

    // Combine additionalSkills with input values, if any
    if (activeProfession.additionalSkills) {
      activeProfession.additionalSkills.forEach((skill) => {
        if (skill.requiresInput && inputValues[skill.name]) {
          // Format the skill with the input value, e.g., "Language (French)"
          setSkills[`${skill.name} (${inputValues[skill.name]})`] = skill.value;
        } else {
          // Use the skill name directly
          setSkills[skill.name] = skill.value;
        }
      });
    }

    // Update the agent's skills
    setAgent((prevAgent) => {
      return {
        ...prevAgent,
        skills: setSkills,
      };
    });
  };

  const handleInputChange = (uniqueKey: string, value: string) => {
    setInputValues((prevValues) => ({
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
          return inputValues[uniqueKey] && inputValues[uniqueKey].trim() !== "";
        }
        return true; // If no input is required, it's considered filled
      });

    // Check additionalSkills: Ensure the number of selected skills matches the required count and that all selected skills with requiresInput are filled
    const selectedAdditionalSkills = Object.keys(inputValues).filter(
      (key) => key.startsWith("additional-") // Identifying additional skills by their unique key prefix
    );

    const allAdditionalSkillsFilled =
      selectedAdditionalSkills.length === requiredCount &&
      selectedAdditionalSkills.every((key) => {
        const skill = activeProfession.additionalSkills.find(
          (_, index) => key === `additional-${index}`
        );
        if (skill?.requiresInput) {
          return inputValues[key] && inputValues[key].trim() !== "";
        }
        return true;
      });

    return allProfessionalSkillsFilled && allAdditionalSkillsFilled;
  };

  const handleCheckboxChange = (uniqueKey: string, isChecked: boolean) => {
    const selectedSkillsCount = Object.keys(inputValues).filter((key) =>
      key.startsWith("additional-")
    ).length;
    const requiredCount = activeProfession.rule?.count || 0;

    if (isChecked && selectedSkillsCount >= requiredCount) {
      return;
    }

    if (isChecked) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [uniqueKey]: "", // Initialize with an empty string or some default value
      }));
    } else {
      setInputValues((prevValues) => {
        const updatedValues = { ...prevValues };
        delete updatedValues[uniqueKey];
        return updatedValues;
      });
    }
  };

  const renderStep = (step: ProfessionFormStep) => {
    switch (step) {
      case ProfessionFormStep.SelectProfession:
        return (
          <>
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
          </>
        );
      case ProfessionFormStep.ProfessionBuilder:
        const skills = activeProfession.professionalSkills.map(
          (skill, index) => {
            // Create a unique key using the skill name and index
            const uniqueKey = `${skill.name}-${index}`;
            const isInputRequired = skill.requiresInput;

            return (
              <div key={uniqueKey}>
                <label htmlFor={`checkbox-${uniqueKey}`}>{skill.name}</label>

                {isInputRequired && (
                  <input
                    type="text"
                    value={inputValues[uniqueKey] || ""}
                    onChange={(e) => {
                      handleInputChange(uniqueKey, e.target.value);
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
          const selectedSkillsCount = Object.keys(inputValues).length;
          const requiredCount = activeProfession.rule?.count || 0;

          additionalSkills = activeProfession.additionalSkills.map(
            (skill, index) => {
              // Create a unique key using the skill name and index
              const uniqueKey = `additional-${index}`;
              const isChecked = inputValues[uniqueKey] !== undefined;
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
                      value={inputValues[uniqueKey] || ""}
                      onChange={(e) => {
                        handleInputChange(uniqueKey, e.target.value);
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
            <Button onClick={handleCancelSelection}>Cancel selection</Button>
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
