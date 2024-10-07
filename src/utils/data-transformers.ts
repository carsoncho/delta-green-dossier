import { AgentDocument } from "@/models/agent";
import { IProfessionDocument } from "@/models/profession";
import { IAgent } from "@/types/agent";
import { IProfession } from "@/types/professions";
import { FlattenMaps } from "mongoose";

const extractProfession = (agent: FlattenMaps<AgentDocument>) => {
  if (agent?.profession) {
    return {
      name: agent.profession.name,
      description: agent.profession.description,
      bonds: agent.profession.bonds,
      recommendedStats: agent.profession.recommendedStats,
      professionalSkills: agent.profession.professionalSkills,
      additionalSkills: agent.profession?.additionalSkills,
    };
  }

  return null;
};

export const transformDocumentToAgent = (
  doc: FlattenMaps<AgentDocument>
): IAgent => {
  return {
    _id: doc._id.toString(),
    givenName: doc.givenName,
    familyName: doc.familyName,
    motivations: doc.motivations,
    hasCompletedCreation: doc.hasCompletedCreation,
    profession: doc?.profession,
    employer: doc?.employer,
    nationality: doc?.nationality,
    gender: doc?.gender,
    genderOther: doc?.genderOther,
    birthDate: doc?.birthDate,
    education: doc?.education,
    physicalDescription: doc?.physicalDescription,
    stats: doc?.stats,
    bonds: doc?.bonds,
    disorders: doc?.disorders,
    adaptedHelplessness: doc?.adaptedHelplessness,
    adaptedViolence: doc?.adaptedViolence,
    wounds: doc?.wounds,
    armorAndGear: doc?.armorAndGear,
    weapons: doc?.weapons,
    personalNotes: doc?.personalNotes,
    homeDevelopments: doc?.homeDevelopments,
    statGenerationMode: doc?.statGenerationMode,
    skills: doc?.skills,
  };
};

export const transformDocumentToProfession = (
  doc: FlattenMaps<IProfessionDocument>
): IProfession => {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    recommendedStats: doc.recommendedStats,
    professionalSkills: doc.professionalSkills,
    additionalSkills: doc.additionalSkills,
    bonds: doc.bonds,
    rule: doc.rule,
  };
};
