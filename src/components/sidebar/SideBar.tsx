import React, { FC } from "react";
import styled from "styled-components";

interface SideBarProps {}
const SideBarWrapper = styled.div`
  position: relative;
  background: #0f1d40;
  color: white;
  grid-column: 1/3;
  grid-row: 1/13;
`;
const SideBar: FC<SideBarProps> = () => {
  return <SideBarWrapper></SideBarWrapper>;
};

export default SideBar;
