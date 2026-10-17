import React from "react";
import { styled } from "styled-components";
import { PersonalInfo } from "../data";
import { Button, Chip, ChipRow, Container, Eyebrow, Section, SectionTitle } from "../Styles/StyledComponents";
import { asset } from "../utils";

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 72px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Photo = styled.img`
  width: 100%;
  max-width: 340px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 24px;
  border: 1px solid var(--line-strong);

  @media (max-width: 900px) {
    max-width: 260px;
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  p {
    color: var(--muted);
    font-size: 1.06rem;
  }

  ${SectionTitle} {
    margin-bottom: 8px;
  }
`;

const Skills = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  h4 {
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--faint);
    margin-bottom: 12px;
  }

  ${Chip} {
    color: var(--text);
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
`;

const About: React.FC = () => (
  <Section id="about">
    <Grid>
      <Photo src={asset(PersonalInfo.aboutImage ?? PersonalInfo.image)} alt={PersonalInfo.name} loading="lazy" />

      <Copy>
        <Eyebrow>About me</Eyebrow>
        <SectionTitle>{PersonalInfo.aboutTitle}</SectionTitle>
        {PersonalInfo.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}

        <Skills>
          {PersonalInfo.skills.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              <ChipRow>
                {group.items.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </ChipRow>
            </div>
          ))}
        </Skills>

        <Actions>
          {PersonalInfo.cvUrl && (
            <Button href={asset(PersonalInfo.cvUrl)} download>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
              Download CV
            </Button>
          )}
          <Button href="#contact" $variant="ghost">
            Contact me
          </Button>
        </Actions>
      </Copy>
    </Grid>
  </Section>
);

export default About;
