export const dynamic = "force-dynamic"; // defaults to auto
import { Agent } from "@/models/agent";
import { connectToMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectToMongoDB();
  try {
    const agents = await Agent.find();
    return NextResponse.json({ sucess: true, data: agents });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

// export async function PATCH() {
//   // @todo: implement
// }
