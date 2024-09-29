import { Button } from "@/app/components/ui/button";
import { AgentName } from "@/app/components/utils/agent-utils";
import { useAgentContext } from "@/context/agent-context";
import { FiSave } from "react-icons/fi";
import StatsBuilder from "../../stats-builder/stats-builder";
import { CompletedSteps } from "@/app/agent/[agent]/builder/page";
import { IAgent } from "@/types/agent";
import { Input } from "@/app/components/ui/input";
import { ChangeEvent } from "react";
import { FormStep } from "@/app/agent/[agent]/builder/page";

interface StatsStepSchema {
  completedSteps: CompletedSteps;
  handleSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toggleCompletedStep: (step: FormStep) => void;
}
export default function StatsStep(props: StatsStepSchema) {
  const { agent, setAgent } = useAgentContext();

  if (!agent) return "<p>waiting...</p>";

  /**
   * const to track if the agent has changed at all
   */
  let originalAgent = {} as IAgent;

  /**
   * @todo: change this either to handle only string inputs or all
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAgent((agent) => {
      const updatedAgent = agent || ({} as IAgent);
      return { ...updatedAgent, [name]: value };
    });
  };

  return (
    <div className="">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Welcome {AgentName(agent)}{" "}
        <Button onClick={props.handleSave} disabled={agent === originalAgent}>
          <FiSave />
        </Button>
      </h2>

      <StatsBuilder
        completedSteps={props.completedSteps}
        toggleCompletedSteps={props.toggleCompletedStep}
      />

      <div className="grid grid-cols-1 gap-6">
        <Input
          type="text"
          name="givenName"
          placeholder="First Name"
          value={agent.givenName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="familyName"
          value={agent.familyName}
          placeholder="Last Name"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
