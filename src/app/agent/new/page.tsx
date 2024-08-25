"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/card/card";
// export const metadata = {
//   title: "Create new Agent",
//   description: "Your agent roster",
// };

export default function New() {
  const router = useRouter();
  const createAgent = async () => {
    try {
      const res = await fetch("/api/agent/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ givenName: "John", familyName: "Doe" }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const agent = await res.json();
      return agent;
    } catch (error) {
      console.error("Failed to create agent:", error);
      return null;
    }
  };

  const handleStandardClick = async () => {
    const agent = await createAgent();
    if (agent && agent.data._id) {
      router.push(`/agent/${agent.data._id}/builder`);
    } else {
      console.error("Agent creation failed or _id is undefined");
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  const handleClick = () => {
    alert("Card clicked!");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-7xl">Create new Agent</h1>
      <div className="flex w-full flex-row items-center justify-evenly">
        <Card
          onClick={handleStandardClick}
          title="Standard"
          body="Create a brand new agent."
        />
        <Card
          title="Premade"
          body="Pick from a wide selection of premade Agents to quickly start your Night at the Opera."
          onClick={handleClick}
        />
      </div>
    </main>
  );
}
