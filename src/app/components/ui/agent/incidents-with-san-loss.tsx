import { useState } from "react";
import { IAgent } from "@/types/agent";

export default function IncidentsWithoutSanLoss(props: {
  agent: IAgent;
  type: string;
}) {
  const property =
    props.type === "violence" ? "adaptedViolence" : "adaptedHelplessness";
  const label = props.type === "violence" ? "Violence" : "Helplessness";

  const [incidents, setIncidents] = useState(props.agent[property]);

  const inputs = [];
  for (let i = 0; i < 3; i++) {
    inputs.push(
      <div key={i} className="mr-4">
        <label className="hidden" htmlFor={`${property}-${i}`}>
          {`${property}-${i}`}
        </label>
        <input
          type="checkbox"
          checked={incidents > i && incidents != 0}
          onChange={(event) => {
            let newValue = incidents;
            event.target.checked ? newValue++ : newValue--;
            setIncidents(newValue);
          }}
          name={`${property}-${i}`}
          id={`${property}-${i}`}
        />
      </div>
    );
  }
  return (
    <div>
      <p>{label}</p>
      <div className="flex">
        {inputs}
        <span>
          <em>adapted</em>
        </span>
      </div>
    </div>
  );
}
