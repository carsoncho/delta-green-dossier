import Link from "next/link";
import AgentsList from "@/features/agents/components/agents-list";

export default function Agents() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-3">
      <AgentsList />
      <div className="fixed w-full bottom-0 p-4">
        <Link
          href="/agent/new"
          className="border-solid border-white border-2 p-4"
        >
          Create new Agent
        </Link>
      </div>
    </main>
  );
}
