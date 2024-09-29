import { AgentName } from "@/utils/agent-utils";
import AgentGroupWrapper from "./agent-group-wrapper";
import GroupHeader from "./group-header";
import { IAgent } from "@/types/agent";

export default function AgentProfileInfo(props: {
  className?: string;
  agent: IAgent;
}) {
  const classes = `profile-info ${props.className || ""}`;
  const itemClasses = `mb-1 pb-1 border-solid border-b-2 border-white last:border-none`;
  const labelClasses = `tiny-label text-xs mr-2`;
  return (
    <AgentGroupWrapper className={classes}>
      <GroupHeader heading="Agent Profile" />
      <div className="p-3">
        <div className={itemClasses}>
          <label className={labelClasses}>1 NAME</label>
          <p className="text-lg">{AgentName(props.agent)}</p>
        </div>
        <div className={itemClasses}>
          <label className={labelClasses}>2 PROFESSION (RANK)</label>
          <p className="text-lg">{props.agent.profession.name}</p>
        </div>
        <div className={itemClasses}>
          <label className={labelClasses}>3 EMPLOYER</label>
          <p className="text-lg">{props.agent.employer}</p>
        </div>
        <div className={itemClasses}>
          <label className={labelClasses}>4 DOB</label>
          {/* <p className="text-lg">{props.agent.birthDate}</p> */}
          <p className="text-lg">N/A</p>
        </div>
        <div className={itemClasses}>
          <label className={labelClasses}>5 SEX</label>
          <p className="text-lg">{props.agent.gender}</p>
        </div>
      </div>
    </AgentGroupWrapper>
  );
}
