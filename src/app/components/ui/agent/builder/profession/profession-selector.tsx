import { useAgentContext } from "@/context/agent-context";
import { IProfession } from "@/types/professions";
import { useEffect, useState } from "react";
import ProfessionItem from "./profession-item";
import { Skill } from "@/types/skills";
import ProfessionSkillInput from "./profession-skill-select";
import SelectInput from "../../../select-input";
import { Button } from "@/app/components/ui/button";

enum FormStep {
  SelectProfession = "SELECT_PROFESSION",
  ProfessionBuilder = "PROFESSION_BUILDER",
}

export default function ProfessionSelector() {
  const { agent, setAgent } = useAgentContext();
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [activeProfession, setActiveProfession] = useState({} as IProfession);
  const [searchFilter, setSearchFilter] = useState("");
  const [formStep, setFormStep] = useState<FormStep>(
    activeProfession._id
      ? FormStep.ProfessionBuilder
      : FormStep.SelectProfession
  );
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const fetchProfessions = async () => {
    const res = await fetch(`/api/professions`);
    const professions = await res.json();
    return professions;
  };

  useEffect(() => {
    fetchProfessions().then((res: { professions: IProfession[] }) => {
      setProfessions(res.professions);
    });
  }, []);

  if (!professions) return null;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const filteredProfessions = professions.filter((profession) =>
    profession.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSelectProfession = (profession: IProfession) => {
    setActiveProfession(profession);
    setFormStep(FormStep.ProfessionBuilder);
  };

  const handleCancelSelection = () => {
    setActiveProfession({} as IProfession);
    setFormStep(FormStep.SelectProfession);
  };

  const setProfessionAndSkills = () => {
    // Step 1: Build the skills object
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

    console.log(setSkills);

    // Step 2: Update the agent's skills
    setAgent((prevAgent) => {
      return {
        ...prevAgent,
        skills: setSkills, // Update the skills property with the new skills object
      };
    });

    console.log(agent);
  };

  const handleInputChange = (skillName: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [skillName]: value,
    }));
  };

  const areAllInputsFilled = () => {
    // Ensure the active profession and its skills are defined
    if (!activeProfession || !activeProfession.professionalSkills) return false;

    // Check if all required professionalSkills inputs are filled
    const areProfessionalSkillsFilled =
      activeProfession.professionalSkills.every(
        (skill) =>
          !skill.requiresInput ||
          (inputValues[skill.name] && inputValues[skill.name].trim() !== "")
      );

    // Check if all required additionalSkills inputs are filled (if they exist)
    const areAdditionalSkillsFilled =
      !activeProfession.additionalSkills ||
      activeProfession.additionalSkills.every(
        (skill) =>
          !skill.requiresInput ||
          (inputValues[skill.name] && inputValues[skill.name].trim() !== "")
      );

    return areProfessionalSkillsFilled && areAdditionalSkillsFilled;
  };

  const renderStep = (step: FormStep) => {
    switch (step) {
      case FormStep.SelectProfession:
        return (
          <>
            <input
              type="text"
              value={searchFilter}
              onChange={handleFilterChange}
              placeholder="Filter professions"
              className="mb-4 p-2 border rounded w-full text-black"
            />
            <div className="professions-list">
              {filteredProfessions.map((profession: IProfession) => (
                <ProfessionItem
                  className={""}
                  key={profession._id.toString()}
                  profession={profession}
                  setActiveProfession={handleSelectProfession}
                />
              ))}
            </div>
          </>
        );
      case FormStep.ProfessionBuilder:
        const skills = activeProfession.professionalSkills.map(
          (skill, index) => {
            if (skill.requiresInput) {
              return (
                <ProfessionSkillInput
                  key={index}
                  skill={skill}
                  value={inputValues[skill.name] || ""}
                  onChange={(e) => {
                    handleInputChange(skill.name, e.target.value);
                  }}
                />
              );
            } else {
              return (
                <p key={index}>
                  {skill.name}: {skill.value}%
                </p>
              );
            }
          }
        );

        let additionalSkills: React.ReactNode[] = [];
        if (
          activeProfession.additionalSkills &&
          activeProfession.additionalSkills.length > 0
        ) {
          additionalSkills = activeProfession.additionalSkills.map(
            (skill, index) => {
              if (skill.requiresInput) {
                return (
                  <ProfessionSkillInput
                    key={index}
                    skill={skill}
                    value={inputValues[skill.name] || ""}
                    onChange={(e) => {
                      handleInputChange(skill.name, e.target.value);
                    }}
                  />
                );
              } else {
                return (
                  <p key={index}>
                    {skill.name}: {skill.value}%
                  </p>
                );
              }
            }
          );
        }

        return (
          <div>
            <h1 className="font-bold text-xl">
              Active Profession: {activeProfession.name}
            </h1>
            <Button onClick={handleCancelSelection}>Cancel selection</Button>
            <div>
              <p>Base Skills:</p>
              {skills}
            </div>
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
    <div className="professions-selector w-full">{renderStep(formStep)}</div>
  );
}
