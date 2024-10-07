"use server";

import { GenerateFullName } from "@/utils/agent-utils";
import { connectToMongoDB } from "@/lib/mongodb";
import { Agent } from "@/models/agent";
import { IAgent } from "@/types/agent";
import { transformDocumentToAgent } from "@/utils/data-transformers";
import { revalidatePath } from "next/cache";

/**
 * Updates an Agent document
 *
 * @todo: Make this retireve based on user ID / auth
 * @todo: come up with API response type
 * @returns
 */
interface updateAgentResponse {
  success: boolean;
  agent?: IAgent;
}

export const updateAgent = async (
  agent: IAgent
): Promise<updateAgentResponse> => {
  try {
    await connectToMongoDB();
    console.log("made it to updateAgent");
    const updatedAgent = await Agent.findByIdAndUpdate(agent._id, agent, {
      new: true,
    }).lean();

    if (updateAgent === null) {
      return { success: false };
    }

    revalidatePath("/agents", "page");
    revalidatePath(`/agent/[agent]`, "page");
    revalidatePath(`/agent/[agent]/builder`, "page");

    return { success: true, agent: transformDocumentToAgent(updatedAgent) };
  } catch (e) {
    throw new Error("failed to create new agent");
  }
};
