import { YouTubePlayer } from "@/components/youtube-player";

/** Full uploads playlist embed — useful when a simple channel archive player is enough. */
export function YouTubeFeed({ channelId, title }: { channelId: string; title: string }) {
  return <YouTubePlayer channelId={channelId} title={title} />;
}
