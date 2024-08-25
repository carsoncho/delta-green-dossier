import Link from "next/link";

export default function Home() {
  return (
    <main className="grid-lines prose flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className="text-7xl">Welcome Agent</h1>
      <Link href={"/agents"}>Sign In</Link>
      <p> TODO LOGIN</p>
    </main>
  );
}
