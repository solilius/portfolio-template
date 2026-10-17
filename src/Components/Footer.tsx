import React from "react";
import styled from "styled-components";
import { PersonalInfo } from "../data";
import { Container } from "../Styles/StyledComponents";

const Bar = styled.footer`
  border-top: 1px solid var(--line);
  padding: 28px 0;
  font-size: 0.86rem;
  color: var(--faint);
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  a {
    color: var(--muted);
    transition: color 0.2s;

    &:hover {
      color: var(--text);
    }
  }
`;

const Footer: React.FC = () => (
  <Bar>
    <Inner>
      <span>
        © {new Date().getFullYear()} {PersonalInfo.name}
      </span>
      <span>
        Built with the free{" "}
        <a href="https://github.com/solilius/portfolio-template" target="_blank" rel="noopener noreferrer">
          portfolio template
        </a>{" "}
        by{" "}
        <a href="https://solilius.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
          Sol Elan
        </a>
      </span>
    </Inner>
  </Bar>
);

export default Footer;
