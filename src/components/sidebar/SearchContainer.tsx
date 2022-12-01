import React, { FC } from "react";
import styled from "styled-components";
import searchImg from "../../assets/search.svg";

interface SearchContainerProps {}
const SearchWrapper = styled.div`
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

const SearchContainer: FC<SearchContainerProps> = () => {
  return (
    <SearchWrapper>
      <Search placeholder="Search..." />
      <SearchIcon src={searchImg} alt="Search icon" />
    </SearchWrapper>
  );
};

export default SearchContainer;
