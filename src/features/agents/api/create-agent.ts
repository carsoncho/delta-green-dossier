import { GenerateFullName } from "@/utils/agent-utils";
import { connectToMongoDB } from "@/lib/mongodb";
import { Agent } from "@/models/agent";
import { IAgent } from "@/types/agent";
import { transformDocumentToAgent } from "@/utils/data-transformers";
import { z } from "zod";

export async function CreateAgent(): Promise<IAgent> {
  try {
    await connectToMongoDB();
    const values = {} as IAgent;
    const { givenName, familyName } = GenerateFullName();
    values.givenName = givenName;
    values.familyName = familyName;
    let agent = new Agent(values);
    await agent.save();
    return transformDocumentToAgent(agent);
  } catch (e) {
    throw e;
  }
}
