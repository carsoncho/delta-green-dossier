export const dynamic = "force-dynamic"; // defaults to auto
import { connectToMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Profession from "@/models/profession";

export async function GET(request: Request) {
  await connectToMongoDB();
  try {
    const professions = await Profession.find();
    return NextResponse.json({ professions });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

// export async function POST(request: Request) {
//   try {
//     const example = await Agent.create(request.body);
//     Response.json({ success: true, data: example });
//   } catch (error) {
//     Response.json({ success: false });
//   }
// }

// export async function PATCH() {
//   // @todo: implement
// }
