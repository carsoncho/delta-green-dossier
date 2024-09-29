import GroupHeader from "./group-header";
import AgentGroupWrapper from "./agent-group-wrapper";
import { IAgent, IStats } from "@/types/agent";
import { AgentStats } from "@/utils/agent-utils";

export default function AgentAttributes(props: {
  className?: string;
  agent: IAgent;
}) {
  const attributesList: React.ReactNode[] = [];
  type AttributeKey = keyof IStats;

  // const attributes = AgentStats

  Object.keys(AgentStats).forEach((attr) => {
    // Main thing we want is the "x5" number. All Attributes are between 3-18 and then mulitplied by 5 to determine the DC number.
    const attributeKey = attr as AttributeKey; // assert the type
    const attributeScore = props.agent.stats[attributeKey] * 5;
    attributesList.push(
      <div
        key={attr}
        className="agent-attribute-item flex flex-col justify-center items-center p-2 border-solid border-white border-2 flex-1"
      >
        <span className="agent-attribute-label">
          {AgentStats[attributeKey]}
          <span className="agent-attribute-label-abbr">({attr})</span>
        </span>
        <span className="agent-attribute-score-primary text-2xl">
          {attributeScore}
        </span>
        <span className="agent-attribute-score-secondary text-xs">
          {props.agent.stats[attributeKey]}
        </span>
      </div>
    );
  });

  const classes = `agent-attributes flex flex-col justify-center items-center ${
    props.className || ""
  }`;

  return (
    <AgentGroupWrapper className={classes}>
      <GroupHeader heading="Attributes" />
      <div className="flex flex-wrap">{attributesList}</div>
    </AgentGroupWrapper>
  );
}
