import React, { useCallback, useEffect, useRef, useState } from "react";
import { keyframes, styled } from "styled-components";
import { Game, MediaType } from "../types";
import { Button, Chip, ChipRow } from "../Styles/StyledComponents";
import { asset, kindLabel, mediaThumb, youtubeEmbed } from "../utils";
import Icon from "./Icon";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: none; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(3, 6, 14, 0.82);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.2s ease-out;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: 1180px;
  max-height: calc(100vh - 48px);
  overflow: auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  animation: ${rise} 0.25s ease-out;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    max-height: 100vh;
    height: 100%;
    border-radius: 0;
    align-content: start;
  }
`;

const Viewer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  min-width: 0;
`;

const Stage = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: var(--stage);

  img,
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: contain;
  }
`;

const NavButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => $side}: 12px;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: color-mix(in srgb, var(--bg) 70%, transparent);
  backdrop-filter: blur(6px);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.2s;

  &:hover {
    background: color-mix(in srgb, var(--bg) 95%, transparent);
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const Thumb = styled.button<{ $active: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 104px;
  aspect-ratio: 16 / 9;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: var(--stage);
  border: 2px solid ${({ $active }) => ($active ? "var(--accent)" : "transparent")};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: opacity 0.2s, border-color 0.2s;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PlayGlyph = styled.span<{ $size?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ $size = 28 }) => $size}px;
  height: ${({ $size = 28 }) => $size}px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-items: center;

  &::after {
    content: "";
    margin-left: 12%;
    border-style: solid;
    border-width: ${({ $size = 28 }) => `${$size * 0.2}px 0 ${$size * 0.2}px ${$size * 0.32}px`};
    border-color: transparent transparent transparent #fff;
  }
`;

const Details = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px 24px;
  border-left: 1px solid var(--line);

  h3 {
    font-size: 1.7rem;
    padding-right: 36px;
  }

  p {
    color: var(--muted);
  }

  @media (max-width: 900px) {
    border-left: 0;
    border-top: 1px solid var(--line);
  }
`;

const Kind = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
`;

const Meta = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 16px;
  margin: 0;
  font-size: 0.92rem;

  dt {
    color: var(--faint);
  }

  dd {
    margin: 0;

    a {
      color: var(--accent-2);

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;

  ${Button} {
    height: 42px;
    padding: 0 18px;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: var(--surface-2);
  cursor: pointer;
  display: grid;
  place-items: center;

  &:hover {
    background: var(--bg-2);
  }
`;

const Chevron: React.FC<{ dir: "left" | "right" }> = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

interface GameModalProps {
  game: Game;
  startIndex?: number;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = game.media.length;
  const current = game.media[index];

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [index]);

  return (
    <Overlay onClick={onClose}>
      <Panel role="dialog" aria-modal="true" aria-label={game.name} onClick={(e) => e.stopPropagation()}>
        <Close ref={closeRef} onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Close>

        <Viewer>
          <Stage>
            {current.type === MediaType.YouTube ? (
              <iframe
                key={current.source}
                src={youtubeEmbed(current.source)}
                title={`${game.name} video`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <img key={current.source} src={asset(current.source)} alt={`${game.name} screenshot ${index + 1}`} />
            )}
            {count > 1 && (
              <>
                <NavButton $side="left" onClick={() => go(-1)} aria-label="Previous">
                  <Chevron dir="left" />
                </NavButton>
                <NavButton $side="right" onClick={() => go(1)} aria-label="Next">
                  <Chevron dir="right" />
                </NavButton>
              </>
            )}
          </Stage>

          {count > 1 && (
            <Thumbs>
              {game.media.map((m, i) => (
                <Thumb
                  key={m.source}
                  ref={(el) => (thumbRefs.current[i] = el)}
                  $active={i === index}
                  onClick={() => setIndex(i)}
                  aria-label={`Show media ${i + 1}`}
                >
                  <img src={mediaThumb(m)} alt="" loading="lazy" />
                  {m.type === MediaType.YouTube && <PlayGlyph $size={24} />}
                </Thumb>
              ))}
            </Thumbs>
          )}
        </Viewer>

        <Details>
          <Kind>{kindLabel[game.kind]}</Kind>
          <h3>{game.name}</h3>
          <p>{game.description}</p>
          <ChipRow>
            {game.genres.map((g) => (
              <Chip key={g}>{g}</Chip>
            ))}
          </ChipRow>
          <Meta>
            <dt>Platforms</dt>
            <dd>{game.platforms.join(", ")}</dd>
            <dt>Engine</dt>
            <dd>{game.engine}</dd>
            {game.source && (
              <>
                <dt>Made for</dt>
                <dd>
                  <a href={game.source.url} target="_blank" rel="noopener noreferrer">
                    {game.source.name}
                  </a>
                </dd>
              </>
            )}
          </Meta>
          {game.links.length > 0 && (
            <LinkRow>
              {game.links.map((l, i) => (
                <Button key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" $variant={i === 0 ? "primary" : "ghost"}>
                  <Icon name={l.icon} />
                  {l.label}
                </Button>
              ))}
            </LinkRow>
          )}
        </Details>
      </Panel>
    </Overlay>
  );
};

export default GameModal;
