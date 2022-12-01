import React, { FC } from "react";
import styled from "styled-components";
import logo from "../../assets/bordio-logo.svg";
import SearchContainer from "./SearchContainer";
import TaskLists from "./TaskLists";
import WorkSpace from "./WorkSpace";

interface SideBarProps {}
const SideBarWrapper = styled.div`
  position: relative;
  background: #0f1d40;
  display: flex;
  flex-direction: column;
  color: white;
  grid-column: 1/4;
  grid-row: 1/12;
  padding: 26px 16px;
`;
const Logo = styled.img`
  align-self: flex-start;
  width: 130px;
`;
const SideBar: FC<SideBarProps> = () => {
  return (
    <SideBarWrapper>
      <Logo src={logo} alt="Bordio Logo" />
      <SearchContainer />
      <WorkSpace />
      <TaskLists />
    </SideBarWrapper>
  );
};

export default SideBar;
