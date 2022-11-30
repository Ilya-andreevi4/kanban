import React, { FC } from "react";
import styled from "styled-components";
import logo from "../../assets/bordio-logo.svg";
import searchImg from "../../assets/search.svg";
import avatar from "../../assets/avatar.svg";

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
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 26px auto 0px;
  padding: 9px 10px;
  width: 100%;
  height: 32px;
  background: #2d4071;
  border-radius: 4px;
`;
const Search = styled.input.attrs({ type: "text" })`
  background: #2d4071;
  color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  margin: 0;
`;
const SearchIcon = styled.img``;
const WorkSpaceName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2d4071;
  color: white;
  height: 34px;
  width: 100%+32px;
  margin: 19px -16px 0px;
  padding: 6px 16px;
`;
const UserAvatar = styled.img``;
const SideBar: FC<SideBarProps> = () => {
  return (
    <SideBarWrapper>
      <Logo src={logo} alt="Bordio Logo" />
      <SearchContainer>
        <Search placeholder="Search..." />
        <SearchIcon src={searchImg} alt="Search icon" />
      </SearchContainer>
      <WorkSpaceName>
        <UserAvatar src={avatar} alt="avatar" />
        My workspace
      </WorkSpaceName>
    </SideBarWrapper>
  );
};

export default SideBar;
