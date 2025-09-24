import React from "react";
import { styled } from "styled-components";
import { Game as GameInterface } from "../types";
import { Modeling as ModelingInterface } from "../types";
import LogoButton from "./LogoButton";
import { Column, Row } from "../Styles/StyledComponents";

interface ModelInfoProps {
  model: ModelingInterface;
}

const ModelInfoContainer = styled(Column)`
`;

const GameTitle = styled.h1`
  font-family: "ZenDots", sans-serif;
  font-size: 2rem;
  color: #00ced1;
  margin-top: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const GameDescription = styled.p`
  margin: 0;
  font-size: 1.5rem;

    @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoTable = styled(Column)`
  gap: 5px;
  margin: 20px 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoRow = styled(Row)`
  gap: 8px;
`;

const InfoKey = styled.span`
  font-weight: bold;
  min-width: 70px;
  text-align: left;
`;

const InfoValue = styled.span`
  color: silver;
`;

const LinksContainer = styled(Row)`
  gap: 10px;
`;

const ModelInfo: React.FC<ModelInfoProps> = ({ model }) => {
    return (
        <ModelInfoContainer>
            <GameTitle>{model.name}</GameTitle>
            <GameDescription>{model.description}</GameDescription>

            <InfoTable>
                <InfoRow>
                    <InfoKey>Software:</InfoKey>
                    <InfoValue>{model.software}</InfoValue>
                </InfoRow>

                {model.source && <InfoRow>
                    <InfoKey>Source:</InfoKey>
                    <InfoValue >
                        <a href={model.source.url} target="_blank" rel="noopener noreferrer">
                            {model.source.name}
                        </a>
                    </InfoValue>
                </InfoRow>}
            </InfoTable>
        </ModelInfoContainer>
    );
};

export default ModelInfo;
