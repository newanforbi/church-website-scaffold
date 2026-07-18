// A channel's uploads are always available as a playlist with the same ID,
// but with the "UC" prefix swapped for "UU" — no API key required.
export function getUploadsEmbedUrl(channelId: string) {
  const playlistId = channelId.replace(/^UC/, "UU");
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`;
}
