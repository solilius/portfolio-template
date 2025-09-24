import { AboutMeData, Game, Modeling, GameEngine, LinkImageSource, MediaType, Platform, Software } from "./types";

export const PersonalInfo: AboutMeData = {
  name: "Kharisma Assyuro Yarisunal Firdaus",
  role: "Game Developer, 3D Modeling",
  introduction: "Pengembang game pemula yang berfokus pada pengembangan menggunakan Unity dan pemodelan 3D dasar dengan Blender. Memiliki antusiasme tinggi untuk belajar dan berkembang di industri game, serta berkomitmen untuk membangun pengalaman interaktif yang inovatif melalui kolaborasi dan eksplorasi teknologi",
  description: "Deorang mahasiswa aktif Pendidikan Ilmu Komputer di Universitas Pendidikan Indonesia. Saya memiliki kompetensi yang solid dalam pemrograman, 3D modelling, dan desain game. Pengalaman saya sebagai Team Lead dan Public Relation telah membuktikan kemampuan saya dalam kepemimpinan, manajemen proyek, serta analisis untuk meningkatkan efisiensi proses hingga 40%. Saya termotivasi untuk mengaplikasikan kemampuan teknis dan manajerial saya untuk berkontribusi pada kesuksesan tim.",
  image: `${process.env.PUBLIC_URL}/images/Profile2.jpg`,
  cvUri: `${process.env.PUBLIC_URL}/files/My_CV.pdf`,
  links: {
    github: "https://github.com/Kharissz",
    itchIO: "https://kharoyanada.itch.io",
    linkedIn: "https://www.linkedin.com/in/kharisma-assyuro-yarisunal-firdaus",
  }
};

export const games: Game[] = [
  {
    name: "Pamastu",
    job: "Game Designer, Game Programmer",
    description: "Find your way out of the haunted forest and uncover the mysterious events that unfold.",
    genres: ["Survival Horror, Exploration, Pixel Graphic, Puzzle"],
    platforms: [Platform.Windows],
    engine: GameEngine.Unity,
    links: [
      { source: LinkImageSource.Github, url: "https://github.com/Kharissz/Group4_Game" },
      { source: LinkImageSource.ItchIo, url: "https://kachappa-team.itch.io/pamastu" },
    ],
    media: [
      { source: "/images/games/Pamastu/start_screen.png", type: MediaType.Image },
      { source: "/images/games/Pamastu/explore.png", type: MediaType.Image },
      { source: "https://www.youtube.com/embed/0FIT1m1aImI?si=ce-I-KuR3FelW1gp", type: MediaType.YouTube }
    ],
  },
  {
    name: "PlayCode",
    job: "Game Designer, Game Programmer",
    description: "Defeat the enemy with Code",
    genres: ["Education, RPG, Top-Down"],
    platforms: [Platform.Windows],
    engine: GameEngine.Unity,
    links: [
      { source: LinkImageSource.Github, url: "https://github.com/Kharissz/PlayCode_Game/tree/Haris" },
    ],
    media: [
      { source: "/images/games/PlayCode/Dialogue.png", type: MediaType.Image },
      { source: "/images/games/PlayCode/Knowledge.png", type: MediaType.Image },
      { source: "/images/games/PlayCode/Tutorial.png", type: MediaType.Image },
      { source: "/images/games/PlayCode/Quest.png", type: MediaType.Image },
    ],
  }
];

export const modeling: Modeling[] = [
  {
    name: "Kokumon",
    description: "Prison from Jujutsu Kaisen",
    media : [
      {source: "https://youtube.com/embed/Evc3fsMhMhA?si=4GYJikBW7MKjiz4X", type: MediaType.YouTube}
    ],
    software : Software.Blender,
  }
]