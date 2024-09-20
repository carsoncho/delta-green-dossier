import { AgentStats, AttributeKey } from "@/app/components/utils/agent-utils";
import { useAgentContext } from "@/context/agent-context";
import { IAgent, IStats } from "@/types/agent";
import { ChangeEvent } from "react";

export default function StatInput(props: { name: AttributeKey }) {
  const { agent, setAgent } = useAgentContext();
  if (!agent) return null;

  const handleStatInput = (e: ChangeEvent<HTMLInputElement>) => {
    // @TODO: Better validation here like zod
    const name = e.target.name as AttributeKey;
    const value = parseInt(e.target.value);

    const newStats = agent.stats || ({} as IStats);
    newStats[name] = value;
    setAgent((agent) => {
      const updatedAgent = agent || ({} as IAgent);
      return { ...updatedAgent, stats: newStats };
    });
  };

  return (
    <>
      <label htmlFor={props.name}>{AgentStats[props.name]}</label>
      <input
        name={props.name}
        type="number"
        value={agent.stats?.[props.name] ?? ""}
        min={3}
        max={18}
        onChange={handleStatInput}
      />
    </>
  );
}
