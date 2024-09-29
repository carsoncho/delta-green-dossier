"use server";

import { revalidatePath } from "next/cache";
import { CreateAgent } from "../api/create-agent";
import { redirect } from "next/navigation";
import { error } from "console";

export async function createAgent(formData: FormData) {
  const agent = await CreateAgent();
  if (!agent) {
    throw error("failed to create agent");
  }
  revalidatePath("/agents");
  // Can't be in a try catch
  redirect(`/agent/${agent._id}/builder`);
}
