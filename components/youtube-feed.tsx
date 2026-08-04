import { getUploadsEmbedUrl } from "@/lib/youtube";

export function YouTubeFeed({ channelId, title }: { channelId: string; title: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-brand-950 shadow-[0_20px_60px_-24px_rgba(15,27,36,0.55)] ring-1 ring-brand-900/10">
      <iframe
        src={getUploadsEmbedUrl(channelId)}
        title={title}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
