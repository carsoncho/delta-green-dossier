import { useEffect, useRef, useState } from "react";
import {
  AgentStats,
  AreStatsFilled,
  AttributeKey,
  GetTotalPoints,
} from "@/utils/agent-utils";
import { IAgent, IStats, Mode } from "@/types/agent";
import PointsBuySelect from "./points-buy-select";
import { useAgentContext } from "@/context/agent-context";

export default function PointsBuy() {
  const { agent, setAgent } = useAgentContext();
  const previousModeRef = useRef<Mode>("");

  const maxPoints = 72;
  const [points, setPoints] = useState(12);

  useEffect(() => {
    const previousMode = previousModeRef.current;
    const currentMode = agent?.statGenerationMode;

    if (currentMode !== previousMode && currentMode === "point_buy") {
      if (AreStatsFilled(agent)) {
        // @todo: handle logic here for if points aded in manual exceed 72
        setPoints(maxPoints - GetTotalPoints(agent));
      } else {
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
      setPoints(12); // Reset points to initial value
    } else if (currentMode === "point_buy") {
      const totalPoints = parseInt(GetTotalPoints(agent));
      setPoints(maxPoints - totalPoints);
    } else if (AreStatsFilled(agent)) {
      setPoints(maxPoints - GetTotalPoints(agent));
    } else {
      setPoints(12);
    }

    // Update the previous mode reference at the end of the effect
    previousModeRef.current = currentMode ?? "";
  }, [agent, setAgent]);

  /**
   *
   * @param key
   * @param newValue
   */
  const handleStatChange = (key: AttributeKey, newValue: number) => {
    const currentStatValue = agent.stats[key] as number;
    const difference = newValue - currentStatValue;

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

  if (!agent.stats) return null;

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
              <label>{AgentStats[key]}</label>
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
