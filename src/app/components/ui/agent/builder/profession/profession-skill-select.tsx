"use client";

import { Skill } from "@/types/skills";

// @todo: hook this up to store the value on the agent
// @todo: add help icon which on hover lists examples
export default function ProfessionSkillInput(props: { skill: Skill }) {
  return (
    <div>
      <label htmlFor={props.skill.name}>{props.skill.name}</label>
      <input
        name={props.skill.name}
        className="text-black"
        type="text"
        placeholder={"..."}
      />
      <span> {props.skill.value}%</span>
    </div>
  );
}
