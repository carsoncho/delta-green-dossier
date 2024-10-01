"use client";

import { AgentName } from "@/utils/agent-utils";
import { IAgent } from "@/types/agent";
import Link from "next/link";
import { useAgentContext } from "@/context/agent-context";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiDelete, FiSearch } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useDeleteAgent } from "../hooks/use-delete-agent";
import { useToast } from "@/hooks/use-toast";

interface AgentsListProps {
  agents: IAgent[];
}

export default function AgentsList({ agents }: AgentsListProps) {
  const { setAgent } = useAgentContext();
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);
  const [confirmationText, setConfirmationText] = useState("");
  const { toast } = useToast();
  const { deleteAgentAction, isLoading } = useDeleteAgent({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Agent successfully deleted.",
      });
      setAgentToDelete(null);
      setConfirmationText("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    if (agentToDelete) {
      deleteAgentAction(agentToDelete);
    }
  };

  const agentsList = agents.map((agent: IAgent) => (
    <Card key={agent._id.toString()} className="w-[350px]">
      <CardTitle>{AgentName(agent)}</CardTitle>
      <CardContent>{agent.physicalDescription}</CardContent>
      <CardFooter>
        <Link href={`/agent/${agent._id}`} onClick={() => setAgent(agent)}>
          <Button>
            <FiSearch /> View
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button onClick={() => setAgentToDelete(agent._id.toString())}>
              <FiDelete /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Please type "DELETE" to confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <input
              type="text"
              placeholder="Type DELETE"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setAgentToDelete(null); // Close the dialog
                  setConfirmationText(""); // Reset the confirmation text
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={confirmationText !== "DELETE" || isLoading}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  ));

  return (
    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
      {agentsList}
    </div>
  );
}
