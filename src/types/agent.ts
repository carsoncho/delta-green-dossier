import { Date, ObjectId } from "mongoose";
import { IProfession } from "./professions";
import { Skill } from "./skills";

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

export type Mode = "manual" | "point_buy" | "";

export interface IAgent {
  _id: ObjectId;
  givenName: string;
  familyName: string;
  profession: IProfession;
  employer: string;
  nationality: string;
  gender?: "M | F";
  genderOther?: string;
  birthDate: Date; // Consider Date type for date parsing
  education: string;
  physicalDescription: string;
  stats: IStats;
  bonds: IBond[];
  motivations: string[];
  disorders: IDisorder[];
  adaptedViolence: number;
  adaptedHelplessness: number;
  wounds?: string;
  armorAndGear?: string;
  weapons?: string[];
  personalNotes?: string;
  homeDevelopments?: string;
  skills: Skill[]; // Dynamic skills with defined keys
  hasCompletedCreation: boolean;
  statGenerationMode: Mode;
}
