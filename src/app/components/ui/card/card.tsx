"use client";
import { IAgent } from "@/types/agent";
import Image from "next/image";
import Link from "next/link";
export default function Card(props: {
  title: string;
  body?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={props.onClick}
      className="max-w-sm w-full rounded overflow-hidden shadow-lg bg-slate-500 cursor-pointer"
    >
      <Image
        src="https://placehold.co/518x285"
        className="w-full"
        alt="Sunset in the mountains"
        width={518}
        height={285}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">{props.body}</p>
      </div>
    </div>
  );
}
