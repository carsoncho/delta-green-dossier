import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import Image from "next/image";

export default function header() {
  return (
    <nav className="flex flex-row items-center justify-between border-b-4 border-indigo-500">
      <Link className="basis-1/5" href="/">
        <Image
          src="/DG_Seal2_green_CLEAN.png"
          width={75}
          height={75}
          alt="The 'Program' logo"
        />
      </Link>
      <ul className="flex basis-4/5">
        <li className="flex">
          <FaHome />
          <Link href="/">Home</Link>
        </li>
        <li className="flex">
          <FaPerson />
          <Link href="/agents">Agent Roster</Link>
        </li>
      </ul>
    </nav>
  );
}
