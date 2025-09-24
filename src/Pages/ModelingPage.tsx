import React from "react";
import { styled } from "styled-components";
import Game from "../Components/Game";
import { games } from "../data";
import { modeling } from "../data";
import { Column } from "../Styles/StyledComponents";
import Model from "../Components/Model";

const GamesContainer = styled(Column)`
  gap: 100px;
  padding: 20px;

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

const Seperator = styled.div`
  width: 100%;
  height: 1px;
  background: silver;
  opacity: 0.2;
`;

const ModelingPage: React.FC = () => (
  <GamesContainer>
    {modeling.map((model, index) => (
      <React.Fragment key={index}>
        <Model model={model} />
        {index !== modeling.length - 1 && <Seperator />}
      </React.Fragment>
    ))}
  </GamesContainer>
);


export default ModelingPage;
