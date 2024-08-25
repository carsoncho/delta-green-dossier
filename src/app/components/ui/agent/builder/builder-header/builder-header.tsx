import { AgentName } from "@/app/components/utils/agent-utils";
import styles from "./builder-header.module.css";
import { IAgent } from "@/types/agent";
import { Dispatch, SetStateAction } from "react";

export default function BuilderHeader(props: {
  agent: IAgent;
  formStep: number;
  setFormStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="w-full border-b-2 border-white border-solid ">
      <p>Agent: {AgentName(props.agent)}</p>
      <ul className="flex justify-evenly items-center p-2">
        <li
          onClick={() => props.setFormStep(1)}
          className={props.formStep === 1 ? styles.active : ""}
        >
          Stats
        </li>
        <li
          onClick={() => props.setFormStep(2)}
          className={props.formStep === 2 ? styles.active : ""}
        >
          Profession
        </li>
        <li
          onClick={() => props.setFormStep(3)}
          className={props.formStep === 3 ? styles.active : ""}
        >
          Bonds & Motivations
        </li>
        <li
          onClick={() => props.setFormStep(4)}
          className={props.formStep === 4 ? styles.active : ""}
        >
          Personal Info
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
