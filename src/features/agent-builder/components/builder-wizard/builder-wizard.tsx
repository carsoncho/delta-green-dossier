"use client";
import { IAgent } from "@/types/agent";
import { Button } from "@/app/components/ui/button/button";
import { Input } from "@/app/components/ui/input";
import BuilderHeader from "../builder-header/builder-header";
import { AgentName } from "@/utils/agent-utils";
import { ChangeEvent, useEffect, useState } from "react";
import { useAgentContext } from "@/context/agent-context";
import StatsBuilder from "../stats-builder/stats-builder";
import { FiSave } from "react-icons/fi";
import { toast } from "@/hooks/use-toast";
import ProfessionSelector from "../profession/profession-selector";
import { IProfession } from "@/types/professions";
/**
 * Enum for tracking all the required steps being completed on the review "step"
 */
export enum FormStep {
  StatsFilled,
  ProfessionFilled,
  BondsFilled,
  PersonalDetailsFilled,
}

export type CompletedSteps = {
  [FormStep.StatsFilled]: boolean;
  [FormStep.ProfessionFilled]: boolean;
  [FormStep.BondsFilled]: boolean;
  [FormStep.PersonalDetailsFilled]: boolean;
};

interface IAgentPutParams {
  agent: IAgent;
}

export default function BuilderWizard(props: {
  agent: IAgent;
  professions: IProfession[];
}) {
  const [formStep, setFormStep] = useState(1);
  const { agent, setAgent } = useAgentContext();

  useEffect(() => {
    setAgent(props.agent);
  }, [props.agent, setAgent]);

  // @todo: update this to be completed based on what's saved in the agent.
  const [completedSteps, setCompletedSteps] = useState({
    [FormStep.StatsFilled]: false,
    [FormStep.ProfessionFilled]: false,
    [FormStep.BondsFilled]: false,
    [FormStep.PersonalDetailsFilled]: false,
  });

  const toggleCompletedStep = (step: FormStep) => {
    setCompletedSteps((prevState) => ({
      ...prevState,
      [step]: !prevState[step],
    }));
  };

  /**
   * const to track if the agent has changed at all
   */
  let originalAgent = {} as IAgent;

  /**
   *
   */
  const nextStep = () => {
    setFormStep((formStep) => formStep + 1);
  };

  /**
   *
   */
  const prevStep = () => {
    setFormStep((formStep) => formStep - 1);
  };

  /**
   * @todo: change this either to handle only string inputs or all
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAgent((agent) => {
      const updatedAgent = agent || ({} as IAgent);
      return { ...updatedAgent, [name]: value };
    });
  };

  /**
   *
   */
  const handleSave = () => {
    saveAgent({ agent: agent })
      .then(() => {
        toast({
          title: "Character Saved",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to save character",
          variant: "destructive",
        });
      });
  };

  /**
   *
   * @param props
   */
  const saveAgent = async (props: IAgentPutParams) => {
    if (!agent._id) {
      console.error("cannot have agent without id");
    }

    const id = agent._id;
    const res = await fetch(`/api/agents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agent),
    });

    if (!res.ok) {
      // Handle error here, e.g., show an alert or a toast notification
      console.error("Failed to save agent data");
    } else {
      const updatedAgent = await res.json();
      // You can also update the state here if needed
      setAgent(updatedAgent.data);
    }
  };

  const renderStep = (agent: IAgent) => {
    switch (formStep) {
      case 1:
        return (
          <div className="">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Welcome {AgentName(agent)}
              <Button onClick={handleSave} disabled={agent === originalAgent}>
                <FiSave />
              </Button>
            </h2>

            <StatsBuilder
              completedSteps={completedSteps}
              handleSave={handleSave}
              toggleCompletedSteps={toggleCompletedStep}
            />

            <div className="grid grid-cols-1 gap-6">
              <Input
                type="text"
                name="givenName"
                placeholder="First Name"
                value={agent.givenName}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="familyName"
                value={agent.familyName}
                placeholder="Last Name"
                onChange={handleChange}
              />
              <Button onClick={nextStep}>Next</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Select your profession {AgentName(agent)}</h2>
            <ProfessionSelector professions={props.professions} />
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
            <Button
              disabled={
                !completedSteps[FormStep.StatsFilled] ||
                completedSteps[FormStep.ProfessionFilled]
              }
            >
              Submit
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!agent) return <p>Waiting....</p>;

  return (
    <>
      <BuilderHeader
        formStep={formStep}
        completedSteps={completedSteps}
        setFormStep={setFormStep}
      />
      <div className="container mx-auto px-4">{renderStep(agent)}</div>
    </>
  );
}
