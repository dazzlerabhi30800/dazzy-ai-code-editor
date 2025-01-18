import { codeChatSession } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    console.log(prompt);
    const result = await codeChatSession.sendMessage(
      "you are very good in this world we cannot hope for better",
    );
    const resp = result.response.text();
    return NextResponse.json({ fileData: resp });
  } catch (err: unknown) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Unknown Error",
      status: 500,
    });
  }
}
