"use client";
import { IProfession } from "@/types/professions";
import { Button } from "@/components/ui/button/button";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { FaUserDoctor } from "react-icons/fa6";

export default function ProfessionItem(props: {
  profession: IProfession;
  className: string;
  setActiveProfession: (profession: IProfession) => void;
}) {
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

  return (
    <AccordionItem value={props.profession.name}>
      <AccordionTrigger>{props.profession.name}</AccordionTrigger>
      <AccordionContent>
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
        <Button onClick={() => props.setActiveProfession(props.profession)}>
          Confirm Profession
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
