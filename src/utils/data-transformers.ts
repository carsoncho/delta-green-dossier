import { AgentDocument } from "@/models/agent";
import { IAgent } from "@/types/agent";
import { FlattenMaps } from "mongoose";

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
