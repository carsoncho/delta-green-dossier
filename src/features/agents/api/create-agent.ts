"use server";

import { GenerateFullName } from "@/utils/agent-utils";
import { connectToMongoDB } from "@/lib/mongodb";
import { Agent } from "@/models/agent";
import { IAgent } from "@/types/agent";
import { transformDocumentToAgent } from "@/utils/data-transformers";
import { revalidatePath } from "next/cache";

/**
 * Creates a new Agent document
 *
 * @todo: Make this retireve based on user ID / auth
 * @todo: come up with API response type
 * @returns
 */
interface createAgentResponse {
  success: boolean;
  agent?: IAgent;
}

export const createAgent = async (): Promise<createAgentResponse> => {
  try {
    await connectToMongoDB();
    const values = {} as IAgent;
    const { givenName, familyName } = GenerateFullName();
    values.givenName = givenName;
    values.familyName = familyName;

    const newAgent = new Agent(values);
    newAgent.isNew = true;
    await newAgent.save();

    const agent = transformDocumentToAgent(newAgent);
    revalidatePath("/agents");

    return { success: true, agent: agent };
  } catch (e) {
    throw new Error("failed to create new agent");
  }
};
