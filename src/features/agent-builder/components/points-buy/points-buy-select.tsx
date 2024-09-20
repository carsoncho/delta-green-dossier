import { AttributeKey } from "@/app/components/utils/agent-utils";
import { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

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
        <SelectItem disabled={disabled} key={i} value={String(i)}>
          {i} {suffix && `(${pointsNeeded > 0 ? "+" : ""}${suffix})`}
        </SelectItem>
      );
    }
    return options;
  };

  const handleValueChange = (val: string) => {
    const newValue = parseInt(val);
    props.setStat(props.name, newValue);
  };

  return (
    <div>
      <label className="text-white" htmlFor={props.name}>
        {props.name}:{" "}
      </label>
      <Select value={String(props.value)} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{generateOptions(3, 18, props.value)}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
