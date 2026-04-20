import { AboutMeData, Game, GameEngine, LinkImageSource, MediaType, Platform } from "./types";

export const PersonalInfo: AboutMeData = {
  name: "TAN WEN JUN",
  role: "YOUR_ROLE",
  introduction: "SHORT_INTRODUCTION",
  description: "TELL_ABOUT_YOURSELF",
  image: `${process.env.PUBLIC_URL}/images/Profile.jpg`,
  cvUri: `${process.env.PUBLIC_URL}/files/YOUR_CV.pdf`,
  links: {
    github: "https://github.com/NAME",
    itchIO: "https://NAME.itch.io",
    linkedIn: "https://www.linkedin.com/in/NAME",
  }
};

export const games: Game[] = [
  {
    name: "GAME_NAME",
    description: "GAME_DESCRIPTION",
    genres: ["GAME_GENRE", "GAME_GENRE..."],
    platforms: [Platform.Windows],
    engine: GameEngine.Unity,
    links: [
      { source: LinkImageSource.Github, url: "https://github.com/YOUR_REPO" },
      { source: LinkImageSource.ItchIo, url: "https://YOUR_ITCH.itch.io/GAME_NAME" },
    ],
    media: [
      { source: "/images/games/GAME_NAME/Screenshot_1.png", type: MediaType.Image },
      { source: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: MediaType.YouTube },
      { source: "/images/games/GAME_NAME/Screenshot_2.png", type: MediaType.Image },
      { source: "/images/games/GAME_NAME/Screenshot_3.png", type: MediaType.Image },
      { source: "/images/games/GAME_NAME/Screenshot_4.png", type: MediaType.Image },
    ],
  },
  {
    name: "GAME_NAME",
    description: "GAME_DESCRIPTION",
    genres: ["GAME_GENRE", "GAME_GENRE..."],
    platforms: [Platform.Windows],
    engine: GameEngine.Unity,
    links: [
      { source: LinkImageSource.Github, url: "https://github.com/YOUR_REPO" },
      { source: LinkImageSource.ItchIo, url: "https://YOUR_ITCH.itch.io/GAME_NAME" },
    ],
    media: [
      { source: "/images/games/GAME_NAME/Screenshot_1.png", type: MediaType.Image },
      { source: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: MediaType.YouTube },
      { source: "/images/games/GAME_NAME/Screenshot_2.png", type: MediaType.Image },
      { source: "/images/games/GAME_NAME/Screenshot_3.png", type: MediaType.Image },
      { source: "/images/games/GAME_NAME/Screenshot_4.png", type: MediaType.Image },
    ],
  }
];
