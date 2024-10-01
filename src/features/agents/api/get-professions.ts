"use server";
import { connectToMongoDB } from "@/lib/mongodb";
import { cache } from "react";
import { IProfession } from "@/types/professions";
import { Profession } from "@/models/profession";
import { transformDocumentToProfession } from "@/utils/data-transformers";

/**
 * Retrieves all Professions.
 *
 * @returns
 *   The array of all Professions.
 */
const getProfessionsFromDB = async (): Promise<IProfession[]> => {
  await connectToMongoDB();
  const professions = await Profession.find().lean();

  return professions.map((profession) => {
    return transformDocumentToProfession(profession);
  });
};

export const getProfessions = cache(getProfessionsFromDB);
