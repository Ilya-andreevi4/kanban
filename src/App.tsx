import React from "react";
import styled from "styled-components";
import Header from "./components/header/Header";
import MainBoard from "./components/main-board/MainBoard";
import SideBar from "./components/sidebar/SideBar";
import ToolsColumn from "./components/tools-colomn/ToolsColumn";

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  display: grid;
  flex-direction: column;
  grid-template-columns: repeat(25, 1fr);
  grid-auto-rows: repeat(12, 1fr);
`;

function App() {
  return (
    <AppWrapper>
      <SideBar />
      <ToolsColumn />
      <Header />
      <MainBoard />
    </AppWrapper>
  );
}

export default App;
