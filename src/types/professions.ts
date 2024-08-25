import { ObjectId } from "mongoose";
import { Skill } from "./skills";

export interface Rule {
  type: "choose" | "chooseIfNotOwned";
  count: number;
  text: string;
}

export interface IProfession {
  _id: ObjectId;
  name: string;
  description: string;
  recommendedStats: string;
  professionalSkills: Skill;
  additionalSkills: Skill;
  bonds: number;
  rule?: Rule;
}
