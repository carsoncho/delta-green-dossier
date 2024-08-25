import { useAgentContext } from "@/context/agent-context";
import { IProfession } from "@/types/professions";
import { useEffect, useState } from "react";
import ProfessionItem from "./profession-item";

export default function ProfessionSelector() {
  const { agent, setAgent } = useAgentContext();
  const [professions, setProfessions] = useState<IProfession[]>([]);
  const [activeProfession, setActiveProfession] = useState("");

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

  const professionsOptionList = professions.map((profession: IProfession) => (
    <option key={profession._id.toString()} value={profession._id.toString()}>
      {profession.name}
    </option>
  ));

  const professionItems = professions.map((profession: IProfession) => (
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
      <div className="professions-list">{professionItems}</div>
    </div>
  );
}
