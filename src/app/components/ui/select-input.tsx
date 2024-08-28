interface Options {
  [key: string]: boolean;
}

interface SelectInputProps {
  label: string;
  options: Options;
}

export default function SelectInput(props: SelectInputProps) {
  // Your component logic here
  return (
    <div>
      <label>{props.label}</label>
      <select>
        {Object.keys(props.options).map((option, index) => (
          <option key={index} value={option} selected={!props.options[option]}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
