import { useEffect } from "react";
import { AgentStats, AreStatsFilled, AttributeKey } from "@/utils/agent-utils";
import { useAgentContext } from "@/context/agent-context";
import { IAgent, IStats, Mode } from "@/types/agent";
import PointsBuy from "@/features/agent-builder/components/points-buy/points-buy";
import ManualStats from "../manual-stats/manual-stats";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  FormStep,
  CompletedSteps,
} from "@/features/agent-builder/components/builder-wizard/builder-wizard";
import DerivedAttributes from "../derived-stats";

export default function StatsBuilder(props: {
  completedSteps: CompletedSteps;
  handleSave: () => void;
  toggleCompletedStep: (step: FormStep) => void;
}) {
  const { agent, setAgent } = useAgentContext();

  if (!agent) return <p>Waiting...</p>;

  const mode = agent.statGenerationMode ?? "";

  useEffect(() => {
    const statsFilled = AreStatsFilled(agent);
    const isStepCompleted = props.completedSteps?.[FormStep.StatsFilled];

    // If stats is filled but we haven't completed the step, toggle completion and vice versa.
    if (statsFilled !== isStepCompleted) {
      props.toggleCompletedStep(FormStep.StatsFilled);
    }
  }, [agent, mode, agent.stats, props]);

  const handleModeChange = (val: string) => {
    const value = val as Mode;
    setAgent((agent) => {
      const updatedAgent = agent || ({} as IAgent);
      return { ...updatedAgent, statGenerationMode: value };
    });
  };

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Statistics
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Distinguishing Features: A stat below 9 or above 12 is exceptional.
        Spare a word or two to describe stats outside the average. These help
        give your Agent personality.
      </p>

      <label htmlFor="generation-method">
        Select your statistics generation method
      </label>
      <Select
        name="generation-method"
        value={mode}
        onValueChange={handleModeChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="-- Choose generation method --" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>-- Choose generation method --</SelectLabel>
            <SelectItem value="manual">Manual/Rolled</SelectItem>
            <SelectItem value="point_buy">Point Buy</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {mode === "manual" && <ManualStats />}
      {mode === "point_buy" && <PointsBuy />}
      {!mode && <p>Please select a generation method.</p>}

      {AreStatsFilled(agent) ? <DerivedAttributes /> : ""}
    </>
  );
}
