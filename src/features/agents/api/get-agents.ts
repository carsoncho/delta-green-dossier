import { IAgent } from "@/types/agent";
import { Agent } from "@/models/agent";
import { connectToMongoDB } from "@/lib/mongodb";

/**
 * Retrieves all Agents
 *
 * @todo: Make this retireve based on user ID / auth
 * @returns
 */
export const getAgents = async () => {
  await connectToMongoDB();
  return await Agent.find({}).lean();
};
