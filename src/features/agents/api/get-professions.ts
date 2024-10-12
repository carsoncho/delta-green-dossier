import { Profession } from "@/types/profession";
import { Skill, ProfessionSkill } from "@/types/skills";
import { allProfessions } from "data/professions";
import { baseSkills } from "data/skills";

const mergeSkills = (skills: ProfessionSkill[]): Skill[] => {
  return skills.map((skill) => {
    let baseSkill = skill?.baseSkill
      ? baseSkills.find((base) => base.name === skill.baseSkill)
      : baseSkills.find((base) => base.name === skill.name);

    if (!baseSkill) {
      throw new Error(`Base skill not found for ${skill.name}`);
    }

    return {
      ...baseSkill,
      ...skill,
      requiresInput: skill.baseSkill ? false : baseSkill.requiresInput,
    };
  });
};

export const getProfessions = (): Profession[] => {
  return allProfessions.map((profession) => {
    const mergedProfessionalSkills = mergeSkills(profession.professionalSkills);
    const mergedAdditionalSkills = profession.additionalSkills
      ? mergeSkills(profession.additionalSkills)
      : undefined;

    return {
      ...profession,
      professionalSkills: mergedProfessionalSkills,
      additionalSkills: mergedAdditionalSkills,
    };
  });
};
