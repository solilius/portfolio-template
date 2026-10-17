// ✏️ Everything on the page comes from this file. Replace the placeholder text, links and images with your own.
import { AboutMeData, Featured, Game, GameEngine, Link, MediaItem, MediaType, Platform } from "./types";

// Helpers: shots("folder", ["file1.jpg", ...]) for images in public/images/games/folder, video("YouTube id")
const shots = (folder: string, files: string[]): MediaItem[] =>
  files.map((f) => ({ source: `/images/games/${folder}/${f}`, type: MediaType.Image }));
const video = (id: string): MediaItem => ({ source: `https://www.youtube-nocookie.com/embed/${id}`, type: MediaType.YouTube });

export const PersonalInfo: AboutMeData = {
  name: "Your Name",
  role: "Game Developer",
  logo: undefined, // optional, e.g. "/images/logo.png". Without one, your initials are shown
  headline: "Hi, I'm Your Name. I make",
  headlineHighlight: "games people love to play.",
  introduction: "A short intro about you: what you make, the engine and languages you use, and what you're working on right now.",
  image: "/images/Profile.jpg",
  aboutImage: undefined, // optional second photo for the About section, defaults to image
  cvUrl: "/files/YOUR_CV.pdf", // set to undefined to hide the CV buttons
  aboutTitle: "A little about me",
  bio: [
    "Tell your story here. How did you get into making games, and what do you love about it?",
    "Add a second paragraph about your experience: studios, teams, game jams, or the projects you're proudest of.",
    "Finish with what you're looking for next, like a role, collaborations or freelance work.",
  ],
  skills: [
    { title: "Game development", items: ["Unity", "Gameplay programming", "Multiplayer", "Shaders", "Level design"] },
    { title: "Engineering", items: ["C#", "C++", "TypeScript", "Git"] },
  ],
  stats: [
    { value: "5+", label: "Years making games" },
    { value: "4", label: "Games released" },
    { value: "PC · Mobile", label: "Platforms" },
  ],
  contactText: "I'm open to game development roles and collaborations. If you're hiring or building something cool, reach out.",
};

// Shown in the hero and the contact section. Remove the ones you don't use. Icons: see src/iconPaths.ts
export const socials: Link[] = [
  { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/YOUR_NAME" },
  { icon: "github", label: "GitHub", url: "https://github.com/YOUR_NAME" },
  { icon: "itch", label: "itch.io", url: "https://YOUR_NAME.itch.io" },
  { icon: "email", label: "Email", url: "mailto:you@example.com" },
];

// Optional big showcase for your main game. Set to undefined to hide it.
// It plays the game's first YouTube video. poster and logo are optional images.
export const featured: Featured | undefined = {
  game: "Your Main Game",
};

export const games: Game[] = [
  {
    name: "Your Main Game",
    description: "A short pitch for your game. What does the player do, and why is it fun? Two or three sentences are plenty.",
    genres: ["Action", "Shooter", "3D"],
    kind: "original",
    platforms: [Platform.Windows, Platform.Web],
    engine: GameEngine.Unity,
    links: [
      { icon: "steam", label: "Wishlist on Steam", url: "https://store.steampowered.com/" },
      { icon: "itch", label: "Play on itch.io", url: "https://YOUR_NAME.itch.io/YOUR_GAME" },
    ],
    media: [video("eDHgjaKh5f4"), ...shots("GAME_NAME", ["Screenshot_1.jpg", "Screenshot_2.jpg", "Screenshot_3.jpg", "Screenshot_4.jpg"])],
  },
  {
    name: "Game Jam Entry",
    description: "Made in 48 hours for a game jam. Mention the theme and what you built.",
    genres: ["Puzzle", "2D"],
    kind: "jam",
    platforms: [Platform.Web],
    engine: GameEngine.Godot,
    links: [{ icon: "itch", label: "Play on itch.io", url: "https://YOUR_NAME.itch.io/YOUR_GAME" }],
    source: { name: "Global Game Jam", url: "https://globalgamejam.org/" },
    media: shots("GAME_NAME", ["Screenshot_2.jpg", "Screenshot_1.jpg"]),
  },
  {
    name: "Mobile Game",
    description: "A mobile game with its store links and source code.",
    genres: ["Casual", "Idle"],
    kind: "original",
    platforms: [Platform.iOS, Platform.Android],
    engine: GameEngine.Unity,
    links: [
      { icon: "googleplay", label: "Google Play", url: "https://play.google.com/" },
      { icon: "appstore", label: "App Store", url: "https://www.apple.com/app-store/" },
      { icon: "github", label: "Source code", url: "https://github.com/YOUR_NAME/YOUR_REPO" },
    ],
    media: shots("GAME_NAME", ["Screenshot_3.jpg", "Screenshot_4.jpg"]),
  },
  {
    name: "Course Project",
    description: "Something you built while learning. Credit the course with the source field.",
    genres: ["Platformer"],
    kind: "course",
    platforms: [Platform.Windows],
    engine: GameEngine.Unity,
    links: [{ icon: "github", label: "Source code", url: "https://github.com/YOUR_NAME/YOUR_REPO" }],
    source: { name: "Course name (Udemy)", url: "https://www.udemy.com/" },
    media: shots("GAME_NAME", ["Screenshot_4.jpg", "Screenshot_2.jpg"]),
  },
];
