import React, { FC } from "react";
import styled from "styled-components";

interface MainBoardProps {}
const MainBoardWrapper = styled.div`
  position: relative;
  grid-column: 6/25;
  grid-row: 2/12;
`;
const MainBoard: FC<MainBoardProps> = () => {
  return <MainBoardWrapper></MainBoardWrapper>;
};

export default MainBoard;
