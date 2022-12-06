import styled from "styled-components";
import plus from "../../assets/header-icons/plus.svg";
import bell from "../../assets/header-icons/bell.svg";
import avatar from "../../assets/avatar.png";
import SearchContainer from "../SearchContainer";
import DropdownMenu from "./DropdownMenu";

interface HeaderSectionProps {
  justify: string;
}
interface ButtonMenuProps {
  isAddButton: boolean;
}

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-content: center;
  box-shadow: 0px 2px 4px #f0f1f2;
  grid-column: 6/25;
  grid-row: 1/1;
`;
const HeaderSection = styled.div<HeaderSectionProps>`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: ${({ justify }) =>
    justify === "start" ? "flex-start" : justify === "end" && "flex-end"};
`;
const AddButtonMenu = styled.div<ButtonMenuProps>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: max-content;
  width: max-content;
  padding: ${({ isAddButton }) => isAddButton && "8px 20px"};
  border-radius: ${({ isAddButton }) => isAddButton && "50px"};
  background: ${(props) => (props.isAddButton ? props.theme.accent : "none")};
  color: ${({ isAddButton }) => isAddButton && "#fff"};
`;

const NotificationIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;

  &::before {
    position: absolute;
    bottom: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 20px;
    box-sizing: border-box;
    background-color: #f21247;
    color: #ffffff;

    font-weight: 400;
    font-size: 10px;
    line-height: 10px;
    border: 1px solid #ffffff;
    border-radius: 4px;
    content: "99+";
  }
`;
const UserAvatar = styled.img`
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      {/* Left side */}
      <HeaderSection justify="start">
        <AddButtonMenu isAddButton={true}>
          <img src={plus} alt="+" /> Add New
        </AddButtonMenu>
        <DropdownMenu type="view" />
        <DropdownMenu type="filter" />
      </HeaderSection>

      {/* Right side */}
      <HeaderSection justify="end">
        <SearchContainer place="header" />
        <NotificationIcon>
          <img src={bell} alt="" height={21} width={19} />
        </NotificationIcon>
        <UserAvatar src={avatar} alt="avatar" />
      </HeaderSection>
    </HeaderWrapper>
  );
};

export default Header;
