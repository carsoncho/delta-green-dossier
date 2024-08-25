import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/mongodb";
import { Agent } from "@/models/agent";
import { GenerateFullName } from "@/app/components/utils/agent-utils";
import { IAgent } from "@/types/agent";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const body: IAgent = await req.json();
    if (!body.hasCompletedCreation) {
      // Means this is a new user.
      const { givenName, familyName } = GenerateFullName();
      body.givenName = givenName;
      body.familyName = familyName;
    }
    const agent = new Agent(body);
    await agent.save();

    return NextResponse.json({ success: true, data: agent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
