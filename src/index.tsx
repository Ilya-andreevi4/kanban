import { createGlobalStyle, ThemeProvider } from "styled-components";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import App from "./App";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #222222;
}
`;

const theme = {
  textSecondary: "#8C939F",
  accent: "#0094FF",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </ThemeProvider>
);
