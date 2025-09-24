import React from "react";
import { styled } from "styled-components";
import GameMedia from "./GameMedia";
import { Game as GameInterface } from "../types";
import { Modeling as ModelingInterface } from "../types";
import GameInfo from "./GameInfo";
import { Row } from "../Styles/StyledComponents";
import ModelInfo from "./ModelInfo";

interface ModelProps {
  model: ModelingInterface;
}

const ModelingContainer = styled(Row)`
  align-items: flex-start;
  
  & > * {
    flex: 1;
    max-width: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  & > * {
    flex: 1;
    max-width: 100%;
  }
    
`;

const Model: React.FC<ModelProps> = ({ model }) => {
  return (
    <ModelingContainer>
      <ModelInfo model ={model} />
      <GameMedia media={model.media} />
    </ModelingContainer>
  );
};

export default Model;
