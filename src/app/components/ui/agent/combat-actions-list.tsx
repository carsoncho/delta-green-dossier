"use client";
import { useState } from "react";
import { CombatActions } from "../../../../../data/combat-actions";
import Drawer from "react-modern-drawer";

export default function CombatActionsList() {
  // Define the state with proper typing
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});

  // Type the parameter of the function
  const toggleDrawer = (action: string) => {
    setOpenDrawers((prevOpenDrawers) => ({
      ...prevOpenDrawers,
      [action]: !prevOpenDrawers[action],
    }));
  };

  const list: React.ReactNode[] = CombatActions.map((action) => {
    return (
      <li
        onClick={() => toggleDrawer(action.name)}
        key={action.name}
        className="p-3"
      >
        <span>{action.name}</span>
        <Drawer
          open={!!openDrawers[action.name]}
          onClose={() => toggleDrawer(action.name)}
          direction="right"
          className="bla bla bla"
          lockBackgroundScroll={true}
        >
          <div className="text-black">
            <h2 className="text-lg">{action.name}</h2>
            <p className="mb-4">{action.description}</p>
          </div>
        </Drawer>
      </li>
    );
  });

  return (
    <div>
      <p>Combat Actions</p>
      <ul>{list}</ul>
    </div>
  );
}
