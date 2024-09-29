"use server";
import Link from "next/link";
import AgentsList from "@/features/agents/components/agents-list";
import { Button } from "../components/ui/button";
import { getAgents } from "@/features/agents/api/get-agents";

export default async function Agents() {
  const foundAgents = await getAgents();
  const agents = JSON.parse(foundAgents);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-3">
      <AgentsList agents={agents} />
      <div className="fixed w-full bottom-0 p-4">
        <Link
          href="/agent/new"
          className="border-solid border-white border-2 p-4"
        >
          <Button>Create new Agent</Button>
        </Link>
      </div>
    </main>
  );
}
