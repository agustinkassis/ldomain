import { NextRequest, NextResponse } from "next/server";
import users from "@/mocks/users";

export interface GetUsersRequest {
  page?: number;
}

// Via NOSTR
export async function POST(req: NextRequest) {
  try {
    console.dir(await req.json());

    return NextResponse.json({
      status: true,
      data: users,
    });
  } catch {
    return new Response("Error on json", {
      status: 400,
    });
  }
}
