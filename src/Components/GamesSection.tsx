import React, { useState } from "react";
import { styled } from "styled-components";
import { featured, games } from "../data";
import { Game, GameKind, MediaType } from "../types";
import { Chip, ChipRow, Container, Eyebrow, Section, SectionHeader, SectionLead, SectionTitle } from "../Styles/StyledComponents";
import { asset, kindLabel } from "../utils";
import GameModal, { PlayGlyph } from "./GameModal";
import Icon from "./Icon";

const Top = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 36px;

  ${SectionHeader} {
    margin: 0;
  }
`;

const Filters = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--bg-2);

  @media (max-width: 600px) {
    border-radius: 18px;
  }
`;

const Filter = styled.button<{ $active: boolean }>`
  border: 0;
  cursor: pointer;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "var(--bg)" : "var(--muted)")};
  background: ${({ $active }) => ($active ? "var(--text)" : "transparent")};
  transition: background 0.2s, color 0.2s;

  &:hover {
    color: ${({ $active }) => ($active ? "var(--bg)" : "var(--text)")};
  }

  small {
    margin-left: 6px;
    opacity: 0.6;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;

  &:hover {
    transform: translateY(-6px);
    border-color: var(--line-strong);
    box-shadow: var(--shadow);
  }

  &:hover .cover-fg {
    transform: scale(1.04);
  }
`;

const Cover = styled.button`
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  padding: 0;
  border: 0;
  overflow: hidden;
  cursor: pointer;
  background: var(--stage);

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .cover-bg {
    object-fit: cover;
    filter: blur(18px) brightness(0.55);
    transform: scale(1.2);
  }

  .cover-fg {
    object-fit: contain;
    transition: transform 0.5s;
  }
`;

const Kind = styled.span<{ $kind: GameKind }>`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  backdrop-filter: blur(6px);
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  color: ${({ $kind }) => ($kind === "original" ? "var(--accent)" : $kind === "jam" ? "var(--jam)" : "var(--accent-2)")};
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const VideoTag = styled.span`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 4px 4px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(6px);

  ${PlayGlyph} {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 20px 18px;
  flex: 1;

  h3 {
    font-size: 1.3rem;
  }

  p {
    color: var(--muted);
    font-size: 0.94rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 0.82rem;
  color: var(--faint);

  nav {
    display: flex;
    gap: 6px;
  }

  nav a {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: var(--muted);
    border: 1px solid var(--line);
    transition: color 0.2s, border-color 0.2s, background 0.2s;

    &:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--line-strong);
    }
  }
`;

type FilterKey = "all" | GameKind;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "original", label: "Originals" },
  { key: "jam", label: "Game Jams" },
  { key: "course", label: "Course Projects" },
];

const coverOf = (game: Game) => game.cover ?? game.media.find((m) => m.type === MediaType.Image)!.source;

const GameCard: React.FC<{ game: Game; onOpen: () => void }> = ({ game, onOpen }) => {
  const cover = asset(coverOf(game));
  const hasVideo = game.media.some((m) => m.type === MediaType.YouTube);

  return (
    <Card>
      <Cover onClick={onOpen} aria-label={`Open ${game.name}`}>
        <img className="cover-bg" src={cover} alt="" loading="lazy" />
        <img className="cover-fg" src={cover} alt={`${game.name} screenshot`} loading="lazy" />
        <Kind $kind={game.kind}>{kindLabel[game.kind]}</Kind>
        {hasVideo && (
          <VideoTag>
            <PlayGlyph $size={20} />
            Video
          </VideoTag>
        )}
      </Cover>
      <Body>
        <h3>{game.name}</h3>
        <p>{game.description}</p>
        <ChipRow>
          {game.genres.slice(0, 3).map((g) => (
            <Chip key={g}>{g}</Chip>
          ))}
        </ChipRow>
        <Footer>
          <span>{game.platforms.join(" · ")}</span>
          <nav>
            {game.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" aria-label={`${game.name} on ${l.label}`} title={l.label}>
                <Icon name={l.icon} size={16} />
              </a>
            ))}
          </nav>
        </Footer>
      </Body>
    </Card>
  );
};

const GamesSection: React.FC = () => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [open, setOpen] = useState<Game | null>(null);
  const others = games.filter((g) => g.name !== featured?.game);
  const visible = filter === "all" ? others : others.filter((g) => g.kind === filter);
  const countOf = (key: FilterKey) => (key === "all" ? others.length : others.filter((g) => g.kind === key).length);
  // Only offer filters for kinds that actually have games
  const shownFilters = filters.filter((f) => countOf(f.key) > 0);

  return (
    <Section id="games">
      <Container>
        <Top>
          <SectionHeader>
            <Eyebrow>Portfolio</Eyebrow>
            <SectionTitle>{featured ? "More games I've made" : "Games I've made"}</SectionTitle>
            <SectionLead>Click any game for screenshots, video and links.</SectionLead>
          </SectionHeader>
          {shownFilters.length > 2 && (
          <Filters role="tablist">
            {shownFilters.map((f) => (
              <Filter key={f.key} role="tab" aria-selected={filter === f.key} $active={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
                <small>{countOf(f.key)}</small>
              </Filter>
            ))}
          </Filters>
          )}
        </Top>

        <Grid>
          {visible.map((g) => (
            <GameCard key={g.name} game={g} onOpen={() => setOpen(g)} />
          ))}
        </Grid>
      </Container>

      {open && <GameModal game={open} onClose={() => setOpen(null)} />}
    </Section>
  );
};

export default GamesSection;
