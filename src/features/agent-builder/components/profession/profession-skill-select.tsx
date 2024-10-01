"use client";

import { Skill } from "@/types/skills";
import { ChangeEvent } from "react";

// @todo: hook this up to store the value on the agent
// @todo: add help icon which on hover lists examples
export default function ProfessionSkillInput(props: {
  skill: Skill;
  value: string | "";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={props.skill.name}>{props.skill.name}</label>
      <input
        name={props.skill.name}
        className="text-black"
        type="text"
        value={props.value}
        placeholder={props.skill.inputLabel}
        onChange={props.onChange}
      />
      <span> {props.skill.value}%</span>
    </div>
  );
}
