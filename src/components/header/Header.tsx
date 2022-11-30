import React, { FC } from "react";
import styled from "styled-components";

interface HeaderProps {}
const HeaderWrapper = styled.div`
  position: relative;
  box-shadow: 0px 2px 4px #f0f1f2;
  grid-column: 6/25;
  grid-row: 1/1;
`;
const Header: FC<HeaderProps> = () => {
  return <HeaderWrapper> </HeaderWrapper>;
};

export default Header;
