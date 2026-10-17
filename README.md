# Game Developer Portfolio Template

A clean, modern portfolio for game developers. Show off your games with trailers and screenshot galleries, tell people about yourself, and give them an easy way to reach you.

See it in action on [my portfolio](https://solilius.github.io/portfolio).

**What you get**
- A hero section with your photo, intro, social links and a few quick stats
- An optional featured game with a trailer
- A games grid with filters (originals, game jams, course projects) and a popup gallery for screenshots and YouTube videos
- About, skills and contact sections, plus a CV download
- Works on phones, tablets and desktops
- Every bit of text and every link comes from **one file**: `src/data.ts`

## Getting started

You need [Node.js](https://nodejs.org) 18 or newer and a GitHub account.

1. Click **Use this template** (or fork the repo), then clone your copy.
2. Install and start it:

   ~~~sh
   npm install
   npm start
   ~~~

3. Open [http://localhost:3000](http://localhost:3000). The page reloads as you edit.

## Make it yours

### 1. Your details: `src/data.ts`

Open `src/data.ts` and replace the placeholder text. Everything is commented:

- `PersonalInfo`: your name, role, headline, intro, bio, skills, stats and contact text
- `socials`: your links (LinkedIn, GitHub, itch.io, email and so on)
- `featured`: the name of the game to show in the big featured section, or `undefined` to hide it
- `games`: your games

Leave out what you don't need. For example, delete `stats` items or set `cvUrl: undefined` to hide the CV buttons.

### 2. Your games

Put each game's screenshots in their own folder under `public/images/games/`, then list them in `src/data.ts`:

~~~ts
{
  name: "My Awesome Game",
  description: "A short pitch: what does the player do, and why is it fun?",
  genres: ["Action", "Roguelike"],
  kind: "original", // "original", "jam" or "course"
  platforms: [Platform.Windows, Platform.Web],
  engine: GameEngine.Unity,
  links: [
    { icon: "steam", label: "Wishlist on Steam", url: "https://store.steampowered.com/app/..." },
    { icon: "itch", label: "Play on itch.io", url: "https://you.itch.io/my-awesome-game" },
  ],
  media: [
    video("YOUTUBE_VIDEO_ID"),
    ...shots("my-awesome-game", ["Screenshot_1.jpg", "Screenshot_2.jpg"]),
  ],
  source: { name: "Global Game Jam 2026", url: "https://globalgamejam.org" }, // optional
  cover: "/images/games/my-awesome-game/cover.jpg", // optional, defaults to the first screenshot
},
~~~

- `video("ID")` takes the ID from a YouTube link: for `youtube.com/watch?v=abc123`, use `video("abc123")`.
- `shots("folder", [...])` points at images in `public/images/games/folder`.
- Link icons: `github`, `linkedin`, `x`, `discord`, `steam`, `itch`, `googleplay`, `appstore`, `youtube`, `instagram`, `twitch`, `artstation`, `tiktok`, `whatsapp`, `mastodon`, `gamejolt`, `email`, `website`.

**Tip:** keep screenshots around 1600px wide and save them as `.jpg` or `.webp`. Huge PNGs make the page slow.

### 3. Images and files

| What | Where |
| --- | --- |
| Your photo (square works best) | `public/images/Profile.jpg` |
| Your CV | `public/files/YOUR_CV.pdf` (update `cvUrl` if you rename it) |
| Your logo (optional, shown in the top bar) | anywhere in `public/images`, then set `logo` in `src/data.ts` |
| Browser tab icon | `public/favicon.ico` |
| Link preview image (1200x630) | `public/images/Preview.png` |

### 4. Colors and fonts

All colors and fonts live at the top of `src/Styles/index.css`. Change `--accent` and `--accent-2` to restyle the buttons, highlights and headline gradient in one go.

To change fonts, pick them on [Google Fonts](https://fonts.google.com), swap the font link in `public/index.html`, and set `--font-hero`, `--font-display` and `--font-body`.

### 5. Page title and link preview

Edit the title, description and preview image tags at the top of `public/index.html`. That's what people see when you share your link on LinkedIn, Discord or WhatsApp.

### 6. Optional: WhatsApp contact form

Create a `.env` file in the project root with your number, including the country code:

~~~
REACT_APP_WA_NUMBER=000000000000
~~~

A small "Send via WhatsApp" form then appears in the contact section. Without it, the contact section just shows your links.

## Publish on GitHub Pages

1. Push your changes to GitHub.
2. Run:

   ~~~sh
   npm run deploy
   ~~~

   This builds the site and publishes it to a `gh-pages` branch.
3. On GitHub, go to **Settings > Pages**, set **Source** to **Deploy from a branch**, and pick `gh-pages`.

Your portfolio will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`. Run `npm run deploy` again whenever you make changes.

## License

MIT. Use it, change it, make it yours. A link back in the footer is appreciated but not required.
