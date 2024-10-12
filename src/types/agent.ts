import { Date } from "mongoose";
import { Profession } from "./profession";
import { PlayerSkill } from "./skills";

export interface IStats {
  str?: number;
  con?: number;
  dex?: number;
  int?: number;
  pow?: number;
  cha?: number;
}

export interface IBond {
  bond: string;
  bondScore: number;
}

export interface IDisorder {
  name: string;
  description: string;
  type: "unnatural | helplessness | violence";
}

export interface FullName {
  givenName: string;
  familyName: string;
}

// Represents the "mode" in which the players allocated their stats
export type Mode = "manual" | "point_buy" | "";

export interface IAgent {
  givenName: string;
  familyName: string;
  profession?: Profession;
  employer?: string;
  nationality?: string;
  gender?: "M | F";
  genderOther?: string;
  birthDate?: Date;
  education?: string;
  physicalDescription?: string;
  stats?: IStats;
  bonds?: IBond[];
  motivations: string[];
  disorders?: IDisorder[];
  adaptedViolence?: number;
  adaptedHelplessness?: number;
  wounds?: string;
  armorAndGear?: string;
  weapons?: string[];
  personalNotes?: string;
  homeDevelopments?: string;
  skills?: PlayerSkill[];
  hasCompletedCreation: boolean;
  statGenerationMode?: Mode;
}
