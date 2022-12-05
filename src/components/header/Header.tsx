import styled, { css } from "styled-components";
import plus from "../../assets/header-icons/plus.svg";
import arrow from "../../assets/header-icons/arrow.svg";
import bell from "../../assets/header-icons/bell.svg";
import avatar from "../../assets/avatar.png";
import SearchContainer from "../SearchContainer";
import { useState, useEffect } from "react";
import { dropdownsData, IITem } from "./dropdowns-data";

interface HeaderSectionProps {
  justify: string;
}
interface ButtonMenuProps {
  isAddButton: boolean;
}
interface DropTitleProps {
  isActive: boolean;
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
const ButtonMenu = styled.div<ButtonMenuProps>`
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
const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background: white;
  position: absolute;
  top: 100%;
  left: 0%;
  height: max-content;
  width: max-content;
  margin-top: 8px;
  padding: 6px;
  align-items: flex-start;
  text-align: right;
  cursor: pointer;
  z-index: 100;
`;
const ArrowImg = styled.img<DropTitleProps>`
  ${({ isActive }) =>
    isActive &&
    css`
      transform: rotate(-180deg);
    `}
`;
const SelectTitle = styled.div<DropTitleProps>`
  display: flex;
  align-items: center;
  justify-items: center;
  height: max-content;
  width: max-content;
  background: ${({ isActive }) => (isActive ? "#e1e4e7" : "#f5f8fa")};
  padding: 8px 14px 8px 20px;
  border-radius: 50px;
  gap: 8px;
  &:hover {
    cursor: pointer;
    background: ${({ isActive }) => (isActive ? "#e1e4e7" : "#e8ebef")};
  }
`;
const DropdownTitle = styled.li<DropTitleProps>`
  display: flex;
  flex-direction: column;
  min-width: 120px;
  background: ${({ isActive }) => (isActive ? "#F5F8FA" : "white")};
  border-radius: 4px;
  color: black;
  height: max-content;
  width: max-content;
  padding: 8px 5px;
  align-items: flex-start;
  text-align: left;
  justify-items: center;
  cursor: pointer;
  &:hover {
    background: #f5f8fa;
  }
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
  const [dropdowns, setDropdowns] = useState(dropdownsData);
  const [selectedView, setSelectedView] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleOpenDropdown = (type: string) => {
    setDropdowns((prevState) =>
      prevState.map((d) => {
        // Открываем нужный dropdown, если другой dropdown открыт, то закрываем его.
        if (d.title === type) {
          d.isOpen = !d.isOpen;
        } else if (d.isOpen) {
          d.isOpen = false;
        }
        return d;
      })
    );
  };

  const handleChangeSelect = (
    selectId: number,
    dropType: string,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Выбранную яйчейку помещаем в нужный селектор.
    dropdowns.forEach((d) => {
      if (d.title === dropType) {
        d.list.forEach((i) => {
          if (i.id === selectId) {
            if (dropType === "view") {
              setSelectedView(i.title);
            } else if (dropType === "filter") {
              setSelectedFilter(i.title);
            }
          }
        });
      } else return;
    });
  };
  // В селекторы вкладываем активную яйчейку
  useEffect(() => {
    setSelectedView(
      dropdowns.find((d) => d.title === "view")?.list.find((t) => t.isActive)
        ?.title || ""
    );
    setSelectedFilter(
      dropdowns.find((d) => d.title === "filter")?.list.find((t) => t.isActive)
        ?.title || ""
    );
  }, []);

  // После изменений селекторов активируем необходимые яйчейки, а у остальных выключаем активность
  useEffect(() => {
    setDropdowns((prev) => {
      const copyArr = prev.map((d) => {
        const newDrops: IITem[] = d.list.map((i) => {
          if (i.title === selectedView || i.title === selectedFilter) {
            return { ...i, isActive: true };
          } else return { ...i, isActive: false };
        });
        return { ...d, list: newDrops };
      });
      return copyArr;
    });
  }, [selectedView, selectedFilter]);

  return (
    <HeaderWrapper>
      {/* Left side */}
      <HeaderSection justify="start">
        <ButtonMenu isAddButton={true}>
          <img src={plus} alt="+" /> Add New
        </ButtonMenu>
        <ButtonMenu
          isAddButton={false}
          onClick={() => handleOpenDropdown("view")}
        >
          <SelectTitle
            isActive={
              dropdowns.find((d) => d.title === "view")?.isOpen || false
            }
          >
            {selectedView}
            <ArrowImg
              src={arrow}
              alt=""
              isActive={
                dropdowns.find((d) => d.title === "view")?.isOpen || false
              }
            />
          </SelectTitle>
          {dropdowns.map(
            (d, idx) =>
              d.isOpen &&
              d.title === "view" && (
                <Dropdown key={idx}>
                  {d.list.map((i, index) => (
                    <DropdownTitle
                      key={index}
                      isActive={i.isActive}
                      onClick={(e) => handleChangeSelect(i.id, "view", e)}
                    >
                      {i.title}
                    </DropdownTitle>
                  ))}
                </Dropdown>
              )
          )}
        </ButtonMenu>
        <ButtonMenu
          isAddButton={false}
          onClick={() => handleOpenDropdown("filter")}
        >
          <SelectTitle
            isActive={
              dropdowns.find((d) => d.title === "filter")?.isOpen || false
            }
          >
            {selectedFilter}
            <ArrowImg
              src={arrow}
              alt=""
              isActive={
                dropdowns.find((d) => d.title === "filter")?.isOpen || false
              }
            />
          </SelectTitle>
          {dropdowns.map(
            (d, idx) =>
              d.isOpen &&
              d.title === "filter" && (
                <Dropdown key={idx}>
                  {d.list.map((i, index) => (
                    <DropdownTitle
                      key={index}
                      isActive={i.isActive}
                      onClick={(e) => handleChangeSelect(i.id, "filter", e)}
                    >
                      {i.title}
                    </DropdownTitle>
                  ))}
                </Dropdown>
              )
          )}
        </ButtonMenu>
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
