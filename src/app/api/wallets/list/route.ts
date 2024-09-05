import { NextRequest, NextResponse } from "next/server";
import wallets from "@/mocks/wallets";

export interface GetUsersRequest {
  page?: number;
}

// Via NOSTR
export async function POST(req: NextRequest) {
  try {
    console.dir(await req.json());
    console.dir(wallets);

    return NextResponse.json({
      status: true,
      data: wallets,
    });
  } catch {
    return new Response("Error on json", {
      status: 400,
    });
  }
}
