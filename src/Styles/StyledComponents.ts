import { css, styled } from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const Section = styled.section`
  padding: 110px 0;

  @media (max-width: 768px) {
    padding: 72px 0;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-2);

  &::before {
    content: "";
    width: 22px;
    height: 2px;
    border-radius: 2px;
    background: var(--accent-gradient);
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.9rem);
  font-weight: 700;
  margin-top: 14px;
`;

export const SectionLead = styled.p`
  color: var(--muted);
  font-size: 1.08rem;
  max-width: 620px;
  margin-top: 14px;
`;

export const SectionHeader = styled.header`
  margin-bottom: 48px;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.97rem;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export const Button = styled.a<{ $variant?: "primary" | "ghost" }>`
  ${buttonBase}
  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? css`
          color: var(--on-accent);
          background: var(--accent-gradient);
          box-shadow: 0 10px 30px -10px var(--accent-glow);

          &:hover {
            box-shadow: 0 14px 34px -8px var(--accent-glow);
          }
        `
      : css`
          color: var(--text);
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--line-strong);

          &:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(150, 175, 230, 0.45);
          }
        `}
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--muted);
  background: rgba(150, 175, 230, 0.08);
  border: 1px solid var(--line);
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
