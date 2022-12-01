import React, { FC } from "react";
import styled from "styled-components";
import searchImg from "../assets/search.svg";

interface SearchProps {
  place: string;
}
const SearchWrapper = styled.div<SearchProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin: ${({ place }) => (place === "sidebar" ? "26px auto 0px" : "0px")};
  padding: ${({ place }) =>
    place === "sidebar" ? "9px 10px" : "12px 14px 12px 16px"};
  width: 100%;
  ${({ place }) => (place === "sidebar" ? "100%" : "0px")};
  height: ${({ place }) => (place === "sidebar" ? "32px" : "100%")};
  background: ${({ place }) => (place === "sidebar" ? "#2d4071" : "#F5F8FA")};
  border-radius: ${({ place }) => (place === "sidebar" ? "4px" : "50px")};
`;
const Search = styled.input.attrs({ type: "text" })<SearchProps>`
  background: none;
  color: ${({ place }) => (place === "sidebar" ? "white" : "currentColor")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  margin: 0;
`;
const SearchIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const SearchContainer: FC<SearchProps> = ({ place }) => {
  return (
    <SearchWrapper place={place}>
      <Search placeholder="Search..." place={place} />
      <SearchIcon src={searchImg} alt="Search icon" />
    </SearchWrapper>
  );
};

export default SearchContainer;
