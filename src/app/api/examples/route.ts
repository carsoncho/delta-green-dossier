export const dynamic = "force-dynamic"; // defaults to auto
import Example from "@/models/example";
import { connectToMongoDB } from "@/lib/mongodb";

export async function GET(request: Request) {
  await connectToMongoDB();
  try {
    const examples = await Example.find();
    return Response.json({ success: true, data: examples });
  } catch (error) {
    return Response.json({ success: false });
  }
}

export async function POST(request: Request) {
  try {
    const example = await Example.create(request.body);
    Response.json({ success: true, data: example });
  } catch (error) {
    Response.json({ success: false });
  }
}

export async function PATCH() {
  // @todo: implement
}
