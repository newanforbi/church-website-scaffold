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
      className={`aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ${className}`}
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
