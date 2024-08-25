import { allSkills } from "../../data/skills";

// Define the type for individual skill
type SkillKey = keyof typeof allSkills;

// Define the type for skills with dynamic keys
export type Skill = {
  [key in SkillKey]?: number;
};
