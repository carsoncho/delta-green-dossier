import { AttributeKey } from "@/app/components/utils/agent-utils";
import { IAgent, IStats } from "@/types/agent";
import { useEffect, useState } from "react";
import PointsBuySelect from "./points-buy-select";
import { useAgentContext } from "@/context/agent-context";

// @TODO: Get  PointsBuySelect to read from agent.stats for value.
export default function PointsBuy() {
  const { agent, setAgent } = useAgentContext();

  const maxPoints = 72;
  // Start with 12 points initially since the default is 60.
  const [points, setPoints] = useState(12);

  useEffect(() => {
    // Ensure that agent.stats is initialized
    if (!agent?.stats) {
      setAgent((prevAgent) => {
        const stats = {
          str: 10,
          con: 10,
          dex: 10,
          int: 10,
          pow: 10,
          cha: 10,
        } as IStats;
        const updatedAgent = prevAgent || ({} as IAgent);
        return { ...updatedAgent, stats: stats };
      });
    } else {
      let totalPoints = 0;
      Object.keys(agent.stats).forEach((stat) => {
        const key = stat as AttributeKey;
        totalPoints += agent.stats[key]!;
      });
      setPoints(maxPoints - totalPoints);
    }
  }, [agent, setAgent]);

  // Event handler
  const handleStatChange = (key: AttributeKey, newValue: number) => {
    const currentStatValue = agent.stats[key] as number;
    const difference = newValue - currentStatValue;

    // Update the agent's stats property
    setAgent((prevAgent) => {
      const updatedStats = {
        ...prevAgent!.stats,
        [key]: newValue,
      };

      return {
        ...prevAgent,
        stats: updatedStats,
      };
    });

    setPoints((prevPoints) => prevPoints - difference);
  };

  if (!agent.stats) return;

  return (
    <div className="point-buy-stats flex flex-col items-center">
      <p className="text-xs">
        Divide 72 points among the six stats, or choose a predefined set from
        page 19. A 10 in a stat represents average human capability.
      </p>
      <div className="font-bold">Points Remaining: {points} / 72</div>
      <div className="flex justify-between items-center">
        {Object.keys(agent.stats).map((stat) => {
          const key = stat as AttributeKey;
          return (
            <div key={key} className="text-black flex flex-col text-center">
              <PointsBuySelect
                name={key}
                value={agent.stats[key]!}
                points={points}
                setStat={handleStatChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
