"use client";

import { IAgent } from "@/types/agent";
import AgentGroupWrapper from "./agent-group-wrapper";
import GroupHeader from "./group-header";
import IncidentsWithoutSanLoss from "./incidents-with-san-loss";

export default function PsychologicalData(props: { agent: IAgent }) {
  const bonds: React.ReactNode[] = [];

  props.agent.bonds.map((bond) => {
    bonds.push(
      <p key={bond.bond}>
        {bond.bond}: {bond.bondScore}
      </p>
    );
  });

  const motivations: React.ReactNode[] = [];
  props.agent.motivations.map((motivation, i) => {
    motivations.push(<p key={i}>Motivation: {motivation} </p>);
  });

  const disorders: React.ReactNode[] = [];
  props.agent.disorders.map((disorder, i) => {
    disorders.push(<p key={i}>Disorder: {disorder.name} </p>);
  });

  return (
    <AgentGroupWrapper className="">
      <GroupHeader heading="Psychological Data" />

      <div className="p-3">
        <p className="underline">BONDS</p>
        {bonds}
        <p className="underline">MOTIVATIONS AND MENTAL DISORDERS</p>
        {motivations}
        {disorders}
        <p className="underline">INCIDENTS WITHOUT SAN LOSS</p>
        <IncidentsWithoutSanLoss agent={props.agent} type={"violence"} />
        <IncidentsWithoutSanLoss agent={props.agent} type={"helplessness"} />
      </div>
    </AgentGroupWrapper>
  );
}
