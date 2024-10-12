"use client";

import { useAgentContext } from "@/context/agent-context";
import { useEffect, useState } from "react";
import { Profession } from "@/types/profession";
import { Button } from "@/app/components/ui/button/button";
import { CompletedSteps, FormStep } from "../builder-wizard/builder-wizard";
import { MdCancel } from "react-icons/md";
import { PlayerSkill, Skill } from "@/types/skills";
import { GetSkillName } from "@/utils/agent-utils";
import { IAgent } from "@/types/agent";
import BonusSkills from "../bonus-skills/bonus-skills";
import ProfessionSelector from "./profession-selector";
import ProfessionSkillBuilder from "./profession-skill-builder";

export enum ProfessionFormStep {
  SelectProfession,
  ProfessionBuilder,
  BonusSkills,
  Review,
}

export default function ProfessionBuilder(props: {
  professions: Profession[];
  completedSteps: CompletedSteps;
  toggleCompletedStep: (step: FormStep) => void;
}) {
  const { agent, setAgent } = useAgentContext();
  const [activeProfession, setActiveProfession] = useState({} as Profession);

  const [formStep, setFormStep] = useState<ProfessionFormStep>(
    ProfessionFormStep.SelectProfession
  );

  useEffect(() => {
    // If the agent has a profession, set it as the active profession
    if (agent?.profession) {
      setActiveProfession(agent.profession);
      setFormStep(ProfessionFormStep.BonusSkills);
    }

    // @todo: set skills based off agent's if aleady set
  }, [agent]);

  // @todo: move this logic out to builderwizard.
  // useEffect(() => {
  //   if (formStep !== ProfessionFormStep.ProfessionBuilder) return;

  //   const selectedSkillsCount = selectedAdditionalSkills.size;

  //   // Check if the required number of skills has been selected based on the rule count
  //   const isProfessionFilled =
  //     selectedSkillsCount >= (activeProfession.rule?.count || 0);
  //   const isStepCompleted = props.completedSteps?.[FormStep.ProfessionFilled];

  //   // If profession is filled but the step is not marked as complete, toggle it
  //   if (isProfessionFilled !== isStepCompleted) {
  //     props.toggleCompletedStep(FormStep.ProfessionFilled);
  //   }
  // }, [formStep, selectedAdditionalSkills, activeProfession, props, agent]);

  if (!props.professions) return null;

  /**
   *
   * @param profession
   */
  const handleSelectProfession = (profession: Profession) => {
    console.log("setting active profession", profession);
    setActiveProfession(profession);
    setFormStep(ProfessionFormStep.ProfessionBuilder);
  };

  /**
   *
   */
  const handleCancelSelection = () => {
    setActiveProfession({} as Profession);
    setFormStep(ProfessionFormStep.SelectProfession);
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
          <ProfessionSelector
            professions={props.professions}
            handleSelectProfession={handleSelectProfession}
          />
        );
      case ProfessionFormStep.ProfessionBuilder:
        return (
          <ProfessionSkillBuilder
            activeProfession={activeProfession}
            handleCancelSelection={handleCancelSelection}
          />
        );
      case ProfessionFormStep.BonusSkills:
        return (
          <div>
            <h1 className="font-bold text-xl">
              Set bonus skills for: {activeProfession.name}
            </h1>
            <Button onClick={handleCancelSelection}>
              <MdCancel className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <hr />
            <BonusSkills activeProfession={activeProfession} />
          </div>
        );

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
