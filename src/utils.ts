import { GameKind, MediaItem, MediaType } from "./types";

// Local paths get the deploy prefix and are URL-encoded (folders can have spaces)
export const asset = (path: string) => (path.startsWith("http") ? path : encodeURI(`${process.env.PUBLIC_URL}${path}`));

const youtubeId = (url: string) => url.split("/embed/")[1]?.split(/[?&]/)[0];

export const mediaThumb = (item: MediaItem) =>
  item.type === MediaType.YouTube ? `https://i.ytimg.com/vi/${youtubeId(item.source)}/hqdefault.jpg` : asset(item.source);

export const youtubeEmbed = (url: string, autoplay = true) => `${url}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;

export const kindLabel: Record<GameKind, string> = {
  original: "Original",
  jam: "Game Jam",
  course: "Course Project",
};

export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
