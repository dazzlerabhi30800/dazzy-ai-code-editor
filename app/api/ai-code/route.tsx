import { codeChatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { prompt } = await req.json();
    const result = await codeChatSession.sendMessage(prompt);
    const resp = result.response.text();
    return NextResponse.json({ fileData: resp });
  } catch (err: unknown) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Unknown Error",
      status: 500,
    });
  }
}
