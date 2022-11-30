import React, { FC } from "react";
import styled from "styled-components";

interface MainBoardProps {}
const MainBoardWrapper = styled.div`
  position: relative;
  grid-column: 5/26;
  grid-row: 2/13;
`;
const MainBoard: FC<MainBoardProps> = () => {
  return <MainBoardWrapper></MainBoardWrapper>;
};

export default MainBoard;
