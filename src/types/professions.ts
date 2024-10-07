import { Skill } from "./skills";

export interface Rule {
  type: "choose" | "chooseIfNotOwned";
  count: number;
  text: string;
}

export interface IProfession {
  _id: string;
  name: string;
  description: string;
  recommendedStats: string;
  professionalSkills: Skill[];
  additionalSkills?: Skill[];
  bonds: number;
  rule?: Rule;
}
