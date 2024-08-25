export const dynamic = "force-dynamic"; // defaults to auto
import { Agent, disorderSchema } from "@/models/agent";
import Profession from "@/models/profession";
import { connectToMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { professionSchema } from "@/models/profession";

export async function GET(
  request: Request,
  { params }: { params: { agent: string } }
) {
  await connectToMongoDB();
  try {
    if (!mongoose.models.Professions) {
      mongoose.model("Professions", professionSchema, "Professions");
    }

    if (!mongoose.models.Disorder) {
      mongoose.model("Disorder", disorderSchema, "Disorder");
    }
    const agent = await Agent.findById(params.agent).populate([
      "profession",
      "disorders",
    ]);

    return NextResponse.json({ data: agent });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ success: false });
  }
}
