"use client";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { IAgent, IStats } from "@/types/agent";
import {
  AgentName,
  AgentStats,
  AttributeKey,
} from "@/app/components/utils/agent-utils";
import { useAgentContext } from "@/context/agent-context";
import BuilderHeader from "@/app/components/ui/agent/builder/builder-header/builder-header";
import StatsBuilder from "@/app/components/ui/agent/builder/stats-builder/stats-builder";
import ProfessionSelector from "@/app/components/ui/agent/builder/profession/profession-selector";

interface IAgentParams {
  params: {
    agent: string;
  };
}

const fetchAgent = async (props: IAgentParams) => {
  const res = await fetch(`/api/agents/${props.params.agent}`);
  const agent = await res.json();
  return agent;
};

export default function Page(props: IAgentParams) {
  const { agent, setAgent } = useAgentContext();
  const [formStep, setFormStep] = useState(1);

  const nextStep = () => {
    setFormStep((formStep) => formStep + 1);
  };

  const prevStep = () => {
    setFormStep((formStep) => formStep - 1);
  };

  useEffect(() => {
    fetchAgent(props).then((res: { data: IAgent }) => {
      setAgent(res.data);
    });
  }, [props, setAgent]);

  // @todo: change this either to handle only string inputs or all
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAgent((agent) => {
      const updatedAgent = agent || ({} as IAgent);
      return { ...updatedAgent, [name]: value };
    });
  };

  const manualStats: React.ReactNode[] = [];
  const renderStep = (agent: IAgent) => {
    switch (formStep) {
      case 1:
        return (
          <div className="">
            <h2>Welcome {AgentName(agent)}</h2>
            <StatsBuilder />

            <div className="grid grid-cols-1 gap-6">
              <input
                type="text"
                name="givenName"
                placeholder="First Name"
                value={agent.givenName}
                onChange={handleChange}
                className="text-black mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-white"
              />
              <input
                type="text"
                name="familyName"
                value={agent.familyName}
                placeholder="Last Name"
                onChange={handleChange}
                className="text-black mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-white"
              />
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Select your profession {AgentName(agent)}</h2>
            <ProfessionSelector />
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Define Bonds & Motivations</h2>
            {/* <input type="text" name="bonds" placeholder="Bonds" onChange={handleChange} /> */}
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Personal Details</h2>
            {/* <input type="text" name="finalDetails" placeholder="Final Details" onChange={handleChange} /> */}
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 5:
        return (
          <div>
            <h2>Review</h2>
            {/* <input type="text" name="finalDetails" placeholder="Final Details" onChange={handleChange} /> */}
            <button onClick={prevStep}>Previous</button>
            {/* <button onClick={handleSubmit}>Submit</button> */}
          </div>
        );

      default:
        return null;
    }
  };

  // @TODO: Need to check now if the agent has already completed. If they have completed send them to view route.
  if (!agent || Object.keys(agent).length === 0) return <p>Waiting...</p>;

  return (
    <>
      <BuilderHeader
        agent={agent}
        formStep={formStep}
        setFormStep={setFormStep}
      />
      {renderStep(agent)}
    </>
  );
}
