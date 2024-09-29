import { Button } from "@/app/components/ui/button";
import CreateAgent from "@/features/agents/components/create-agent";

export const metadata = {
  title: "Create new Agent",
  description: "Your agent roster",
};

export default function New() {
  // @todo: Add "create premade button"
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-7xl">Create new Agent</h1>
      <div className="flex w-full flex-row items-center justify-evenly">
        <CreateAgent />
      </div>
    </main>
  );
}
