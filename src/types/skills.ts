type GenericSkillKey =
  | "Art"
  | "Craft"
  | "Foreign Language"
  | "Military Science"
  | "Pilot"
  | "Science";

export interface SkillBase {
  // The name of the skill.
  name: string;
  // The description of the skill from the rulebook.
  description: string;
  // This is the base value the skill has for everyone. It can be any number between 0-100.
  baseValue: number;
  // Some skills are too generic and require additional input, i.e. "Art (Type)" or "Science (Type)"
  requiresInput: boolean;
}

export interface ProfessionSkill {
  // A unique identifier for each skill of the profession.
  id: number;
  // The name of the skill.
  name: string;
  // This is the value of the skill that overrides the baseValue from the profession.
  value: number;
  // This is the optional label that works in conjunction with the "requiresInput" property, i.e. "Choose one", "Choose another".
  inputLabel?: string;
  // This is the base Skill (Art, Science, Pilot, etc.) that have a "Type" that needs input.
  baseSkill?: GenericSkillKey;
}

// Union type which merges the SkillBase and ProfessionSkill with the addition of userInput.
export type Skill = SkillBase &
  ProfessionSkill & {
    // This is for tracking the user's selected skill type, i.e. "Science ({user input here})".
    userInput?: string;
  };

export interface PlayerSkill extends Skill {
  // These are the optional +20% bonuses a user can select when creating their agent.
  bonuses?: number;
  // A skill's value may change over time. This is the value we'll show.
  // This number is based on the skill's "base" property, or the "value" from the ProfessionSkill or the amount of "bonuses" and could fluctuate based on equipped items.
  currentValue: number;
  // This is for tracking the "Improving Skills" on pg 29. if a skill check failed.
  hasFailed?: boolean;
}
