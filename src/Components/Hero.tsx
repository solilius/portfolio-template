import React from "react";
import { keyframes, styled } from "styled-components";
import { PersonalInfo, socials } from "../data";
import { Button, Container } from "../Styles/StyledComponents";
import { asset } from "../utils";
import Icon from "./Icon";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const Wrapper = styled.section`
  position: relative;
  min-height: min(100vh, 980px);
  display: flex;
  align-items: center;
  padding: calc(var(--nav-h) + 40px) 0 60px;
`;

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: center;
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 900px) {
    align-items: center;
    order: 2;
  }
`;

const Badge = styled.span`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.85rem;
  font-weight: 600;

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--jam);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--jam) 20%, transparent);
  }

  @media (max-width: 900px) {
    align-self: center;
  }
`;

const Title = styled.h1`
  font-family: var(--font-hero);
  font-size: clamp(2.6rem, 6vw, 4.4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;

  em {
    font-style: normal;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const Lead = styled.p`
  font-size: clamp(1.05rem, 1.6vw, 1.2rem);
  color: var(--muted);
  max-width: 560px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Socials = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  a {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    color: var(--muted);
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.02);
    transition: color 0.2s, border-color 0.2s, transform 0.2s;

    &:hover {
      color: var(--text);
      border-color: var(--line-strong);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Portrait = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  justify-self: center;
  animation: ${float} 8s ease-in-out infinite;

  &::before {
    content: "";
    position: absolute;
    inset: 6%;
    border-radius: 50%;
    background: var(--accent-gradient);
    filter: blur(70px);
    opacity: 0.45;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 34px;
    background: var(--accent-gradient);
  }

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 32px;
    border: 6px solid var(--bg);
  }

  @media (max-width: 900px) {
    max-width: 260px;
  }
`;

const Stats = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 18px 36px;
  margin: 12px 0 0;
  padding-top: 24px;
  border-top: 1px solid var(--line);

  div {
    display: flex;
    flex-direction: column-reverse;
  }

  dt {
    color: var(--faint);
    font-size: 0.82rem;
  }

  dd {
    margin: 0;
    white-space: nowrap;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.6rem;
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Hero: React.FC = () => (
  <Wrapper id="top">
    <Grid>
      <Copy>
        <Badge>
          <i />
          {PersonalInfo.role}
        </Badge>
        <Title>
          {PersonalInfo.headline} <em>{PersonalInfo.headlineHighlight}</em>
        </Title>
        <Lead>{PersonalInfo.introduction}</Lead>
        <Actions>
          <Button href="#games">See my games</Button>
          <Button href="#contact" $variant="ghost">
            Get in touch
          </Button>
        </Actions>
        <Socials>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
              <Icon name={s.icon} size={18} />
            </a>
          ))}
        </Socials>
        {PersonalInfo.stats.length > 0 && (
          <Stats>
            {PersonalInfo.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </Stats>
        )}
      </Copy>

      <Portrait>
        <img src={asset(PersonalInfo.image)} alt={PersonalInfo.name} />
      </Portrait>
    </Grid>
  </Wrapper>
);

export default Hero;
