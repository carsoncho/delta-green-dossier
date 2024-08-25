import { IAgent } from "@/types/agent";
import AgentGroupWrapper from "./agent-group-wrapper";
import GroupHeader from "./group-header";

export default function DerivedAttributes(props: {
  className?: string;
  agent: IAgent;
}) {
  // » Hit Points (HP): The average of STR and CON (round up).
  const hp = Math.ceil((props.agent.stats.str + props.agent.stats.con) / 2);

  // @todo: make currentHp adjustable
  const currentHp = hp;

  // » Willpower Points (WP): Equal to POW.
  const wp = props.agent.stats.pow;

  // » Sanity Points (SAN): Equal to POW × 5.
  const san = props.agent.stats.pow * 5;

  // » Breaking Point: Equal to SAN minus POW.
  const bp = san - props.agent.stats.pow;

  const classes = `derived-attributes ${props.className || ""} `;

  return (
    <AgentGroupWrapper className={classes}>
      <GroupHeader heading="Derived Attributes" />
      <div className="p-3">
        <p>
          <label>Hit Points (current/max):</label>
          {currentHp}/{hp}
        </p>
        <p>
          <label>Willpower:</label>
          {wp}
        </p>
        <p>
          <label>Sanity:</label>
          {san}
        </p>
        <p>
          <label>Breaking Point:</label>
          {bp}
        </p>
      </div>
    </AgentGroupWrapper>
  );
}
