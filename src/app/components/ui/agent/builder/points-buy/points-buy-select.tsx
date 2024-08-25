import { AttributeKey } from "@/app/components/utils/agent-utils";
import { ChangeEvent } from "react";

export default function PointsBuySelect(props: {
  value: number;
  name: AttributeKey;
  points: number;
  setStat: (key: AttributeKey, newValue: number) => void;
}) {
  const generateOptions = (min: number, max: number, current: number) => {
    let options = [];
    for (let i = min; i <= max; i++) {
      let pointsNeeded = i - current;
      const totalPoints = props.points - pointsNeeded;

      const disabled = totalPoints < 0;

      const suffix = i !== current ? `${pointsNeeded} Points` : "";

      options.push(
        <option disabled={disabled} key={i} value={i}>
          {i} {suffix && `(${pointsNeeded > 0 ? "+" : ""}${suffix})`}
        </option>
      );
    }
    return options;
  };

  const handleValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value);
    props.setStat(props.name, newValue);
  };

  return (
    <div>
      <label className="text-white" htmlFor={props.name}>
        {props.name}:{" "}
      </label>
      <select
        name={props.name}
        value={props.value}
        onChange={handleValueChange}
      >
        {generateOptions(3, 18, props.value)}
      </select>
    </div>
  );
}
