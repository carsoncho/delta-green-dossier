"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip/tooltip";
import { useAgentContext } from "@/context/agent-context";
import { IAgent } from "@/types/agent";
import { FaCircleInfo } from "react-icons/fa6";

export default function DerivedAttributes() {
  const { agent } = useAgentContext();

  if (!agent) return;

  /**
   * Hit points is the average of the Agent's Strength and Constitution stat, rounded up.
   *
   * @returns number
   *   The hit point value for the agent
   */
  const calculateHitPoints = () => {
    if (!agent.stats?.str || !agent.stats?.con) {
      return;
    }

    const hp = Math.ceil((agent.stats?.str + agent.stats?.con) / 2);
    return hp;
  };

  /**
   * Sanity points is the agent's POW (power) stat multiplied by 5.
   *
   * @returns number
   * The sanity value for the agent.
   */
  const calculateSanity = () => {
    if (!agent.stats?.pow) {
      return;
    }

    return agent.stats.pow * 5;
  };

  /**
   * The breaking point value is the agent's POW (power) stat multipled by 4.
   *
   * @returns number
   *   The breaking point value for the agent.
   */
  const calculateBreakingPoint = () => {
    if (!agent.stats?.pow) {
      return;
    }
    return agent.stats.pow * 4;
  };

  return (
    <div className="derived-stats">
      <TooltipProvider>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Derived Attributes
        </h3>
        <p>
          Hit Points (HP)
          <Tooltip>
            <TooltipTrigger>
              <FaCircleInfo />
            </TooltipTrigger>
            <TooltipContent>
              <p>Hit points is the average of STR and CON (rounded up)</p>
            </TooltipContent>
          </Tooltip>
          : {calculateHitPoints()}
        </p>
        <p>
          Will power (WP)
          <Tooltip>
            <TooltipTrigger>
              <FaCircleInfo />
            </TooltipTrigger>
            <TooltipContent>
              <p>Will power is equal to your agent's POW</p>
            </TooltipContent>
          </Tooltip>
          : {agent.stats?.pow}
        </p>
        <p>
          Sanity points (SAN)
          <Tooltip>
            <TooltipTrigger>
              <FaCircleInfo />
            </TooltipTrigger>
            <TooltipContent>
              <p>Sanity points is equal to your agent's POW x 5</p>
            </TooltipContent>
          </Tooltip>
          : {calculateSanity()}
        </p>

        <p>
          Breaking point (BP)
          <Tooltip>
            <TooltipTrigger>
              <FaCircleInfo />
            </TooltipTrigger>
            <TooltipContent>
              <p>Your breaking point is equal to SAN minus POW.</p>
            </TooltipContent>
          </Tooltip>
          : {calculateBreakingPoint()}
        </p>
      </TooltipProvider>
    </div>
  );
}
