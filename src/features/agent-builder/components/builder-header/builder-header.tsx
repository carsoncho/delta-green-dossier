import { AgentName } from "@/utils/agent-utils";
import styles from "./builder-header.module.css";
import { IAgent } from "@/types/agent";
import { Dispatch, SetStateAction } from "react";
import {
  CompletedSteps,
  FormStep,
} from "@/features/agent-builder/components/builder-wizard/builder-wizard";

export default function BuilderHeader(props: {
  formStep: number;
  completedSteps: CompletedSteps;
  setFormStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="w-full border-b-2 border-white border-solid ">
      <ul className="flex justify-evenly items-center p-2">
        <li
          onClick={() => props.setFormStep(1)}
          className={props.formStep === 1 ? styles.active : ""}
        >
          Stats
          {props.completedSteps[FormStep.StatsFilled] === false ? (
            <span className="text-red-500">*</span>
          ) : (
            ""
          )}
        </li>
        <li
          onClick={() => props.setFormStep(2)}
          className={props.formStep === 2 ? styles.active : ""}
        >
          Profession<span className="text-red-500">*</span>
        </li>
        <li
          onClick={() => props.setFormStep(3)}
          className={props.formStep === 3 ? styles.active : ""}
        >
          Bonds & Motivations<span className="text-red-500">*</span>
        </li>
        <li
          onClick={() => props.setFormStep(4)}
          className={props.formStep === 4 ? styles.active : ""}
        >
          Personal Info<span className="text-red-500">*</span>
        </li>
        <li
          onClick={() => props.setFormStep(5)}
          className={props.formStep === 5 ? styles.active : ""}
        >
          Review
        </li>
      </ul>
    </div>
  );
}
