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
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(12, 1fr);
`;

export default function App() {
  return (
    <AppWrapper>
      <SideBar />
      <ToolsColumn />
      <Header />
      <MainBoard />
    </AppWrapper>
  );
}
