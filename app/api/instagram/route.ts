import { NextResponse } from "next/server";
import { fetchInstagramMediaPage } from "@/lib/instagram";

export const revalidate = 1800;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after") || undefined;
  const page = await fetchInstagramMediaPage({ limit: 24, after });

  return NextResponse.json({
    media: page.media,
    nextCursor: page.nextCursor,
    source: page.source,
  });
}
