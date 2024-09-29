import { GenerateFullName } from "@/utils/agent-utils";
import { connectToMongoDB } from "@/lib/mongodb";
import { Agent } from "@/models/agent";
import { IAgent } from "@/types/agent";
import { transformDocumentToAgent } from "@/utils/data-transformers";

/**
 * Creates a new Agent document
 *
 * @todo: Make this retireve based on user ID / auth
 * @returns
 */
export const createAgent = async (): Promise<IAgent> => {
  await connectToMongoDB();
  const values = {} as IAgent;
  const { givenName, familyName } = GenerateFullName();
  values.givenName = givenName;
  values.familyName = familyName;
  const newAgent = new Agent(values);
  await newAgent.save();
  return transformDocumentToAgent(newAgent);
};
