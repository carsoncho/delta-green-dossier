import { Agent } from "@/models/agent";
import { connectToMongoDB } from "@/lib/mongodb";
import { IAgent } from "@/types/agent";

/**
 * Retrieves all Agents
 *
 * @todo: Make this retireve based on user ID / auth
 * @returns
 */
export const getAgent = async (agent: string): Promise<IAgent | null> => {
  await connectToMongoDB();
  return await Agent.findById(agent)
    .populate(["profession", "disorders"])
    .lean();
};
