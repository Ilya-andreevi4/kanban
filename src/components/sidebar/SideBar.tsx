import styled from "styled-components";
import logo from "../../assets/bordio-logo.svg";
import SearchContainer from "../SearchContainer";
import TaskLists from "./TaskLists";
import WorkSpace from "./WorkSpace";

const SideBarWrapper = styled.div`
  position: relative;
  background: #0f1d40;
  display: flex;
  flex-direction: column;
  color: white;
  grid-column: 1/4;
  grid-row: 1/13;
  padding: 26px 16px;
  min-width: 164px;
`;

const Logo = styled.img`
  align-self: flex-start;
  width: 130px;
  cursor: pointer;
`;

export default function SideBar() {
  return (
    <SideBarWrapper>
      <Logo src={logo} alt="Bordio Logo" />
      <SearchContainer place="sidebar" />
      <WorkSpace />
      <TaskLists />
    </SideBarWrapper>
  );
}
