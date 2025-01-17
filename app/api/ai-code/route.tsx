import { codeChatSession } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await codeChatSession.sendMessage(prompt);
    const resp = result.response.text();
    return NextResponse.json(JSON.parse(resp));
  } catch (err: unknown) {
    return NextResponse.json({
      err: err instanceof Error ? err.message : "Unknown Error",
      status: 500,
    });
  }
}
