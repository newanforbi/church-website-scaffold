import { getUploadsEmbedUrl } from "@/lib/youtube";

export function YouTubeFeed({ channelId, title }: { channelId: string; title: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
      <iframe
        src={getUploadsEmbedUrl(channelId)}
        title={title}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
