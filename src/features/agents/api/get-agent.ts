"use server";
import { Agent } from "@/models/agent";
import Profession from "@/models/profession";
import { connectToMongoDB } from "@/lib/mongodb";
import { cache } from "react";
import { IAgent } from "@/types/agent";
import { transformDocumentToAgent } from "@/utils/data-transformers";

/**
 * Retrieves all Agents
 *
 * @todo: Make this retireve based on user ID / auth
 * @returns
 */
const getAgentFromDB = async (agent: string): Promise<IAgent | null> => {
  await connectToMongoDB();
  const found = await Agent.findById(agent)
    .populate(["profession", "disorders"])
    .lean()
    .exec();

  if (!found) return null;

  return transformDocumentToAgent(found);
};

export const getAgent = cache(getAgentFromDB);
