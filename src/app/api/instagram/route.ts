import { env } from "@/env";
import { NextResponse } from "next/server";

const USER_ID = "17841402082829256";
const ACCESS_TOKEN = env.FB_ACCESS_TOKEN;

type InstagramMediaItem = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
};

type InstagramApiResponse = {
  data: InstagramMediaItem[];
};

export async function GET() {
  try {
    const url = `https://graph.facebook.com/v23.0/${USER_ID}/media?fields=media_type,thumbnail_url,timestamp,permalink&limit=10&access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: false },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro na API do Instagram" },
        { status: res.status },
      );
    }

    const json: InstagramApiResponse = await res.json();

    const images = json.data
      .filter((item) => item.thumbnail_url && item.permalink)
      .slice(0, 6)
      .map((item) => ({
        url: item.thumbnail_url!,
        link: item.permalink,
      }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Erro ao buscar Instagram:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
