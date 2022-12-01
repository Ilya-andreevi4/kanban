import React from "react";
import styled from "styled-components";

const MainBoardWrapper = styled.div`
  position: relative;
  grid-column: 6/25;
  grid-row: 2/13;
  background: bisque;
`;
const MainBoard = () => {
  return <MainBoardWrapper></MainBoardWrapper>;
};

export default MainBoard;
