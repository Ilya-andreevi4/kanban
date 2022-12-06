import styled, { css } from "styled-components";
import { FC, useEffect, useRef, useState } from "react";
import arrow from "../../assets/header-icons/arrow.svg";
import { dropdownsData, IDropdawn } from "./dropdowns-data";

interface DropdownMenuProps {
  type: string;
}

interface ButtonMenuProps {
  isAddButton: boolean;
}
interface DropTitleProps {
  isActive: boolean;
}

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
// ToDo перенести компонент кнопки в отдельный компонент и сделать нормальное закрытие при прослушивании клика на другие блоки
const DropdownMenu: FC<DropdownMenuProps> = ({ type }) => {
  const initDropData =
    dropdownsData.find((d) => d.title === type) || dropdownsData[0];
  const [dropdown, setDropdown] = useState<IDropdawn>(initDropData);
  const [selected, setSelected] = useState("");
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = () => {
    setDropdown({ ...dropdown, isOpen: !dropdown.isOpen });
  };

  const handleChangeSelect = (
    selectId: number,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Выбранную яйчейку помещаем в нужный селектор.
    dropdown.list.forEach((i) => {
      if (i.id === selectId) {
        setSelected(i.title);
      }
    });
  };

  useEffect(() => {
    setSelected(dropdown.list.find((t) => t.isActive)?.title || "");
  }, []);

  // В селекторы вкладываем активную яйчейку
  useEffect(() => {
    console.log("render handleClick");
    if (!dropdown.isOpen) return;
    const handleClick = (e: any) => {
      if (!buttonRef.current) return;
      if (!buttonRef.current.contains(e.target)) {
        setDropdown({ ...dropdown, isOpen: false });
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleOpenDropdown]);

  return (
    <ButtonMenu
      isAddButton={false}
      onClick={() => handleOpenDropdown()}
      ref={buttonRef}
    >
      <SelectTitle isActive={dropdown.isOpen}>
        {selected}
        <ArrowImg src={arrow} alt="" isActive={dropdown.isOpen} />
      </SelectTitle>
      {dropdown.isOpen && (
        <Dropdown>
          {dropdown.list.map((i, index) => (
            <DropdownTitle
              key={index}
              isActive={i.isActive}
              onClick={(e) => handleChangeSelect(i.id, e)}
            >
              {i.title}
            </DropdownTitle>
          ))}
        </Dropdown>
      )}
    </ButtonMenu>
  );
};

export default DropdownMenu;
