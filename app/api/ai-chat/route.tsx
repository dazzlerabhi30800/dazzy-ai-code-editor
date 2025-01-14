import { chatSession } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await chatSession.sendMessage(prompt);
    return NextResponse.json({ result: result.response.text() });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ err: err.message, status: 500 });
  }
}
