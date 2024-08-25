import { AgentStats, AttributeKey } from "@/app/components/utils/agent-utils";
import { useAgentContext } from "@/context/agent-context";
import { IAgent, IStats, Mode } from "@/types/agent";
import { ChangeEvent, useState } from "react";
import StatInput from "./stat-input";
import PointsBuy from "../points-buy/points-buy";

export default function StatsBuilder() {
  const { agent, setAgent } = useAgentContext();
  if (!agent) return null;

  const mode = agent.statGenerationMode ?? "";

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Mode;
    setAgent((agent) => {
      const updatedAgent = agent || ({} as IAgent);
      return { ...updatedAgent, statGenerationMode: value };
    });
  };

  const renderManualStats = () => {
    // @TODO: Also add number generators here like DnD beyond
    return (
      <div className="manual-stats">
        <p>
          Roll 4D6 for each stat, drop the lowest die, and sum the remaining
          three. Assign the totals to your stats as desired.
        </p>
        <div className="flex justify-between items-center">
          {Object.keys(AgentStats).map((stat) => {
            const key = stat as AttributeKey;
            return (
              <div key={key} className="text-black flex flex-col text-center">
                <StatInput name={key} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPointBuyStats = () => {
    // @TODO: Also add generic arrays they have in "need to know"
    return <PointsBuy />;
  };

  return (
    <>
      <h3>Statistics</h3>
      <p>
        Distinguishing Features: A stat below 9 or above 12 is exceptional.
        Spare a word or two to describe stats outside the average. These help
        give your Agent personality.
      </p>
      <label htmlFor="generation-method">
        Select your statistics generation method
      </label>
      <select
        onChange={handleModeChange}
        name="generation-method"
        className="text-black"
        value={mode}
      >
        <option value="">-- Choose generation method --</option>
        <option value="manual">Manual/Rolled</option>
        <option value="point_buy">Point Buy</option>
      </select>

      {mode === "manual" && renderManualStats()}
      {mode === "point_buy" && renderPointBuyStats()}
      {!mode && <p>Please select a generation method.</p>}
    </>
  );
}
