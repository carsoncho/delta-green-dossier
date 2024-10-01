"use server";

import { connectToMongoDB } from "@/lib/mongodb";
import { cache } from "react";
import { Agent } from "@/models/agent";

const getAgentsFromDB = async (): Promise<string> => {
  await connectToMongoDB();
  const agents = await Agent.find({})
    .populate("disorders")
    .populate("profession");
  return JSON.stringify(agents);
};

export const getAgents = cache(getAgentsFromDB);
