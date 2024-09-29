export const dynamic = "force-dynamic"; // defaults to auto
import { Agent } from "@/models/agent";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { agent: string } }
) {
  try {
    if (!request.body) {
      return NextResponse.json({
        success: false,
        message: "You must include a body",
      });
    }

    const body = await request.json();
    const updatedAgent = await Agent.findByIdAndUpdate(params.agent, body, {
      new: true,
    });

    if (!updatedAgent) {
      return NextResponse.json({ success: false, message: "Agent not found" });
    }

    return NextResponse.json({ success: true, data: updatedAgent });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
