"use server";

import { connectToMongoDB } from "@/lib/mongodb";
import { Agent } from "@/models/agent";
import { revalidatePath } from "next/cache";

export async function deleteAgent(agentId: string) {
  try {
    await connectToMongoDB();
    await Agent.findByIdAndDelete(agentId);
    revalidatePath("/agents");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete agent");
  }
}
