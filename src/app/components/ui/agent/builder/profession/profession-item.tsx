"use client";
import { IProfession } from "@/types/professions";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../../../button";

export default function ProfessionItem(props: {
  profession: IProfession;
  className: string;
  setActiveProfession: (profession: IProfession) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const skillsList = Object.entries(props.profession.professionalSkills).map(
    ([index, skill]) => (
      <li key={index}>
        {skill.name}: {skill.value as number}
      </li>
    )
  );

  const additionalSkills = props.profession.additionalSkills
    ? Object.entries(props.profession.additionalSkills).map(
        ([index, skill]) => (
          <li key={index}>
            {skill.name}: {skill.value as number}
          </li>
        )
      )
    : [];

  const classNames = props.className.concat(
    "p-3 mb-2 border-white border-b-2 border-solid"
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleConfirmProfession = () => {
    props.setActiveProfession(props.profession);
  };

  return (
    <div className={classNames} onClick={handleClick}>
      <span className="profession-icon"></span>
      <span className="profession-heading">{props.profession.name}</span>
      {isOpen ? (
        <div className="profession-contents">
          <p>{props.profession.description}</p>
          <p>
            <strong>Recommended Stat(s): </strong>
            {props.profession.recommendedStats}
          </p>
          <p>
            <strong>Bonds: </strong>
            {props.profession.bonds}
          </p>
          <p>
            <strong>Professional Skills:</strong>
          </p>
          {skillsList.length > 0 ? (
            <ul className="skills-list">{skillsList}</ul>
          ) : (
            ""
          )}
          <p>
            <strong>Rule: {props.profession.rule?.text}</strong>
          </p>
          <p>
            <strong>Additional Skills:</strong>
          </p>
          {additionalSkills.length > 0 ? (
            <ul className="skills-list">{additionalSkills}</ul>
          ) : (
            ""
          )}
          <Button onClick={handleConfirmProfession}>Confirm Profession</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
