"use client";
import { useEffect, useState } from "react";

interface Example {
  name: string;
  age: number;
  occupation: string;
}

const ExampleComponent = () => {
  const [examples, setExamples] = useState<Example[]>([]);

  useEffect(() => {
    const fetchExamples = async () => {
      const response = await fetch("/api/examples");
      const data = await response.json();
      if (data.success) {
        setExamples(data.data);
      }
    };

    fetchExamples();
  }, []);

  return (
    <div>
      <h1>Examples</h1>
      <ul>
        {examples.map((example) => (
          <li key={example.name}>
            {example.name} - {example.age} - {example.occupation} ({example.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleComponent;
