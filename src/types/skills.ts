import { allSkills } from "../../data/skills";

// Define the type for individual skill
type SkillKey = keyof typeof allSkills;

export type Skill = {
  name: SkillKey;
  value: number;
  requiresInput: boolean;
  inputLabel: string;
};
