import { iconPaths } from "./iconPaths";

// Every icon you can use in links: see src/iconPaths.ts
export type IconName = keyof typeof iconPaths;

export enum Platform {
  Windows = "Windows",
  Mac = "Mac",
  Linux = "Linux",
  iOS = "iOS",
  Android = "Android",
  Web = "Web",
  Console = "Console",
  VR = "VR",
}

export enum GameEngine {
  Unity = "Unity",
  Unreal = "Unreal",
  Godot = "Godot",
  GameMaker = "GameMaker",
  Custom = "Custom engine",
}

export enum MediaType {
  Image = "image",
  YouTube = "youtube",
}

// original = your own game, jam = game jam entry, course = made while following a course
export type GameKind = "original" | "jam" | "course";

export interface MediaItem {
  source: string;
  type: MediaType;
}

export interface Link {
  icon: IconName;
  label: string;
  url: string;
}

export interface Game {
  name: string;
  description: string;
  genres: string[];
  kind: GameKind;
  platforms: Platform[];
  engine: GameEngine;
  links: Link[];
  media: MediaItem[];
  cover?: string;
  source?: { name: string; url: string };
}

export interface Featured {
  game: string;
  poster?: string;
  logo?: string;
}

export interface AboutMeData {
  name: string;
  role: string;
  logo?: string;
  headline: string;
  headlineHighlight: string;
  introduction: string;
  image: string;
  aboutImage?: string;
  cvUrl?: string;
  aboutTitle: string;
  bio: string[];
  skills: { title: string; items: string[] }[];
  stats: { value: string; label: string }[];
  contactText: string;
}
