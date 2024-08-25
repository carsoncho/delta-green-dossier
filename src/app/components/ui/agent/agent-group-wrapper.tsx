import React from "react";

export default function AgentGroupWrapper(props: {
  children: React.ReactNode[];
  className?: string;
}) {
  const defaultClasses = "border-solid border-2 border-white";
  const classes = defaultClasses.concat(" ", props.className || "");
  return <div className={classes}>{props.children}</div>;
}
