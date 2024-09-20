import { Agent } from "@/models/agent";
import { connectToMongoDB } from "@/lib/mongodb";
import { IAgent } from "@/types/agent";

/**
 * Retrieves all Agents
 *
 * @todo: Make this retireve based on user ID / auth
 * @returns
 */
export const getAgents = async (): Promise<IAgent[]> => {
  await connectToMongoDB();
  return await Agent.find({}).lean();
};
