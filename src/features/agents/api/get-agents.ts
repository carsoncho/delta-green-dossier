// src/features/agents/api/get-agents.ts
import { connectToMongoDB } from "@/lib/mongodb";
import { cache } from "react";
import { Agent } from "@/models/agent"; // Import Agent model explicitly

const getAgentsFromDB = async (): Promise<string> => {
  await connectToMongoDB(); // Ensure database connection and model registration
  const agents = await Agent.find({})
    .populate("disorders")
    .populate("profession");
  return JSON.stringify(agents);
};

export const getAgents = cache(getAgentsFromDB);
