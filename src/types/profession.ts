import { Skill, ProfessionSkill } from "./skills";

export interface Rule {
  type: "choose" | "chooseIfNotOwned";
  count: number;
  text: string;
}

export interface ProfessionBase {
  id: number;
  name: string;
  description: string;
  recommendedStats: string;
  professionalSkills: ProfessionSkill[];
  additionalSkills?: ProfessionSkill[];
  bonds: number;
  rule?: Rule;
}

export interface Profession extends ProfessionBase {
  professionalSkills: Skill[];
  additionalSkills?: Skill[];
}
