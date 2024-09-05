import { NextRequest, NextResponse } from "next/server";
import domains from "@/mocks/domains";

// Via NOSTR
export async function POST(req: NextRequest) {
  try {
    console.dir(await req.json());

    return NextResponse.json({
      status: true,
      data: domains,
    });
  } catch {
    return new Response("Error on json", {
      status: 400,
    });
  }
}
