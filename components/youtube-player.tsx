import {
  getPlaylistEmbedUrl,
  getUploadsEmbedUrl,
  getVideoEmbedUrl,
} from "@/lib/youtube";

type YouTubePlayerProps = {
  title: string;
  videoId?: string;
  playlistId?: string;
  channelId?: string;
  className?: string;
  priority?: boolean;
};

export function YouTubePlayer({
  title,
  videoId,
  playlistId,
  channelId,
  className = "",
  priority = false,
}: YouTubePlayerProps) {
  const src = videoId
    ? getVideoEmbedUrl(videoId)
    : playlistId
      ? getPlaylistEmbedUrl(playlistId)
      : channelId
        ? getUploadsEmbedUrl(channelId)
        : null;

  if (!src) return null;

  return (
    <div
      className={`aspect-video w-full overflow-hidden rounded-xl bg-brand-950 shadow-[0_20px_60px_-24px_rgba(15,27,36,0.55)] ring-1 ring-brand-900/10 ${className}`}
    >
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        loading={priority ? "eager" : "lazy"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
