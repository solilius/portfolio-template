import React, { useState } from "react";
import { styled } from "styled-components";
import { featured, games } from "../data";
import { MediaType } from "../types";
import { Button, Chip, ChipRow, Container, Eyebrow, Section, SectionHeader, SectionTitle } from "../Styles/StyledComponents";
import { asset, mediaThumb, youtubeEmbed } from "../utils";
import GameModal, { PlayGlyph } from "./GameModal";
import Icon from "./Icon";

const Card = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  background: var(--surface);
  box-shadow: var(--shadow);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Video = styled.div`
  position: relative;
  min-height: 100%;
  background: #000;

  @media (max-width: 960px) {
    aspect-ratio: 16 / 9;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Poster = styled.button`
  position: absolute;
  inset: 0;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s, filter 0.3s;
  }

  &:hover img {
    transform: scale(1.03);
    filter: brightness(1.08);
  }

  span.label {
    position: absolute;
    left: 20px;
    bottom: 18px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
  }

  &:hover ${PlayGlyph} {
    transform: translate(-50%, -50%) scale(1.08);
  }

  ${PlayGlyph} {
    @media (max-width: 600px) {
      transform: translate(-50%, -50%) scale(0.7);
    }

    background: var(--accent-gradient);
    box-shadow: 0 10px 40px var(--accent-glow);
    transition: transform 0.2s;

    &::after {
      border-left-color: var(--on-accent);
    }
  }
`;

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 36px;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(500px 260px at 100% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%), var(--surface);
  }

  @media (max-width: 600px) {
    padding: 24px 20px;
  }
`;

const Logo = styled.img`
  width: min(200px, 60%);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
`;

const Title = styled.h3`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
`;

const Description = styled.p`
  color: var(--muted);
  font-size: 1.05rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: auto;
`;

const Strip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;

  button {
    flex: 0 0 calc((100% - 70px) / 8);
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 10px;
    overflow: hidden;
    cursor: zoom-in;
    aspect-ratio: 16 / 9;
    background: #000;
    transition: transform 0.2s, border-color 0.2s;

    &:hover {
      transform: translateY(-3px);
      border-color: var(--accent);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      flex-basis: calc((100% - 30px) / 4);
    }
  }
`;

const Featured: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [openAt, setOpenAt] = useState<number | null>(null);
  if (!featured) return null;

  const { game: gameName } = featured;
  const game = games.find((g) => g.name === gameName)!;
  const trailer = game.media.find((m) => m.type === MediaType.YouTube);
  const screenshots = game.media.map((m, i) => ({ m, i })).filter(({ m }) => m.type === MediaType.Image);
  const poster = featured.poster ?? screenshots[0].m.source;

  return (
    <Section id="featured">
      <Container>
        <SectionHeader>
          <Eyebrow>Featured project</Eyebrow>
          <SectionTitle>What I'm working on</SectionTitle>
        </SectionHeader>

        <Card>
          <Video>
            {playing && trailer ? (
              <iframe src={youtubeEmbed(trailer.source)} title={`${game.name} trailer`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            ) : (
              <Poster onClick={() => (trailer ? setPlaying(true) : setOpenAt(screenshots[0].i))} aria-label={trailer ? "Play trailer" : "Open screenshots"}>
                <img src={asset(poster)} alt={`${game.name} key art`} />
                {trailer && <PlayGlyph $size={78} />}
                <span className="label">{trailer ? "Watch the trailer" : "View screenshots"}</span>
              </Poster>
            )}
          </Video>

          <Info>
            {featured.logo ? <Logo src={asset(featured.logo)} alt={game.name} /> : <Title>{game.name}</Title>}
            <Description>{game.description}</Description>
            <ChipRow>
              {game.genres.map((g) => (
                <Chip key={g}>{g}</Chip>
              ))}
              <Chip>{game.engine}</Chip>
            </ChipRow>
            <Actions>
              {game.links.map((l, i) => (
                <Button key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" $variant={i === 0 ? "primary" : "ghost"}>
                  <Icon name={l.icon} />
                  {l.label}
                </Button>
              ))}
            </Actions>
          </Info>
        </Card>

        <Strip>
          {screenshots.map(({ m, i }) => (
            <button key={m.source} onClick={() => setOpenAt(i)} aria-label={`Open screenshot ${i}`}>
              <img src={mediaThumb(m)} alt="" loading="lazy" />
            </button>
          ))}
        </Strip>
      </Container>

      {openAt !== null && <GameModal game={game} startIndex={openAt} onClose={() => setOpenAt(null)} />}
    </Section>
  );
};

export default Featured;
