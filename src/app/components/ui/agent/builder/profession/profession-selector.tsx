import { useAgentContext } from "@/context/agent-context";
import { IProfession } from "@/types/professions";
import { useEffect, useState } from "react";
import ProfessionItem from "./profession-item";
import { Skill } from "@/types/skills";
import ProfessionSkillInput from "./profession-skill-select";
import SelectInput from "../../../select-input";

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

  const professionItems = filteredProfessions.map((profession: IProfession) => (
    <ProfessionItem
      className={""}
      key={profession._id.toString()}
      profession={profession}
      setActiveProfession={handleSelectProfession}
    />
  ));

  const handleCancelSelection = () => {
    setActiveProfession({} as IProfession);
    setFormStep(FormStep.SelectProfession);
  };

  const renderStep = (step: FormStep) => {
    switch (step) {
      case FormStep.SelectProfession:
        // @todo: turn this into a "SelectProfession View"
        return (
          <>
            <input
              type="text"
              value={searchFilter}
              onChange={handleFilterChange}
              placeholder="Filter professions"
              className="mb-4 p-2 border rounded w-full text-black"
            />
            <div className="professions-list">{professionItems}</div>
          </>
        );
        break;
      case FormStep.ProfessionBuilder:
        let anthropologist_or_historian = false;
        let anthrpologistOptions = { Anthropology: false, History: false };
        if (activeProfession.name === "Anthropologist or Historian") {
          // This profesion has an "or" selection between two skills (history or anthropology)
          anthropologist_or_historian = true;
          // @todo: update anthrpologistOptions if agent already has one of these selected
        }

        // @todo: incorporate above component for selecting this.
        const skills = activeProfession.professionalSkills.map(
          (skill: Skill, index) => {
            if (skill.requiresInput) {
              return <ProfessionSkillInput key={index} skill={skill} />;
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
            (skill: Skill, index) => {
              if (skill.requiresInput) {
                return <ProfessionSkillInput key={index} skill={skill} />;
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
          // @todo: turn this into a separate component
          // @todo: make the anthropologist or history component.
          <div>
            <h1 className="font-bold text-xl">
              Active Profession: {activeProfession.name}
            </h1>
            <button onClick={handleCancelSelection}>Cancel selection</button>
            {anthropologist_or_historian ? (
              <SelectInput
                label={"Anthropology or History?"}
                options={anthrpologistOptions}
              />
            ) : (
              ""
            )}
            <div>
              <p>Base Skills:</p>
              <br />
              {skills}
            </div>
            {additionalSkills.length > 0 ? (
              <div>
                <p>Additional Skills:</p>
                <br />
                {additionalSkills}
              </div>
            ) : (
              ""
            )}
          </div>
        );
        break;
      default:
        return null;
    }
  };

  return (
    <div className="professions-selector w-full">{renderStep(formStep)}</div>
  );
}
