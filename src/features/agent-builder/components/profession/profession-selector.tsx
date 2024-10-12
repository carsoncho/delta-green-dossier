"use client";

import { Accordion } from "@/app/components/ui/accordion";
import { Profession } from "@/types/profession";
import ProfessionItem from "./profession-item";
import { useState } from "react";

type ProfessionSelectorNewProps = {
  professions: Profession[];
  handleSelectProfession: (profession: Profession) => void;
};

export default function ProfessionSelector(props: ProfessionSelectorNewProps) {
  const [searchFilter, setSearchFilter] = useState("");

  /**
   *
   * @param event
   */
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  /**
   *
   */
  const filteredProfessions = props.professions.filter((profession) =>
    profession.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchFilter}
        onChange={handleFilterChange}
        placeholder="Filter professions"
        className="mb-4 p-2 border rounded w-full text-black"
      />

      <Accordion type="single" collapsible>
        {filteredProfessions.map((profession: Profession, index: number) => (
          <ProfessionItem
            className={""}
            key={index}
            profession={profession}
            setActiveProfession={props.handleSelectProfession}
          />
        ))}
      </Accordion>
    </div>
  );
}
