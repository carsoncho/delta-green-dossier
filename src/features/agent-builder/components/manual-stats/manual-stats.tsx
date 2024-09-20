import { AgentStats, AttributeKey } from "@/app/components/utils/agent-utils";
import StatInput from "../stats-builder/stat-input";
import { useAgentContext } from "@/context/agent-context";
import { useEffect, useRef } from "react";
import { Mode } from "fs";
import { IAgent, IStats } from "@/types/agent";

// @TODO: Also add number generators here like DnD beyond
export default function ManualStats() {
  const { agent, setAgent } = useAgentContext();
  const previousModeRef = useRef<Mode>("");

  useEffect(() => {
    const previousMode = previousModeRef.current;
    const currentMode = agent?.statGenerationMode;

    if (currentMode !== previousMode && currentMode === "manual") {
      // Reset stats when switching to Point Buy mode
      setAgent((prevAgent) => {
        const stats: IStats = {
          str: 10,
          con: 10,
          dex: 10,
          int: 10,
          pow: 10,
          cha: 10,
        };
        const updatedAgent = prevAgent || ({} as IAgent);
        return { ...updatedAgent, stats: stats };
      });
    }
    // Update the previous mode reference at the end of the effect
    previousModeRef.current = currentMode ?? "";
  }, [agent, setAgent]);

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
}
