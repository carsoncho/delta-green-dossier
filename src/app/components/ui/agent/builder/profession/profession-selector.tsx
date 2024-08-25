import { useAgentContext } from "@/context/agent-context";
import { IProfession } from "@/types/professions";
import { useEffect, useState } from "react";
import ProfessionItem from "./profession-item";

export default function ProfessionSelector() {
  const { agent, setAgent } = useAgentContext();
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [activeProfession, setActiveProfession] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const fetchProfessions = async () => {
    const res = await fetch(`/api/professions`);
    const professions = await res.json();
    return professions;
  };

  useEffect(() => {
    fetchProfessions().then((res: { professions: IProfession[] }) => {
      setProfessions(res.professions);
    });
  }, []);

  if (!professions) return null;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const filteredProfessions = professions.filter((profession) =>
    profession.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const professionItems = filteredProfessions.map((profession: IProfession) => (
    <ProfessionItem
      className={""}
      key={profession._id.toString()}
      profession={profession}
      isOpen={activeProfession === profession._id.toString()}
      setActiveProfession={setActiveProfession}
    />
  ));

  return (
    <div className="professions-selector w-full">
      <input
        type="text"
        value={searchFilter}
        onChange={handleFilterChange}
        placeholder="Filter professions"
        className="mb-4 p-2 border rounded w-full text-black"
      />
      <div className="professions-list">{professionItems}</div>
    </div>
  );
}
