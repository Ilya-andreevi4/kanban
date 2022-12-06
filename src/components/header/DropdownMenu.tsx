import styled, { css } from "styled-components";
import { FC, useEffect, useRef, useState } from "react";
import arrow from "../../assets/header-icons/arrow.svg";
import { dropdownsData } from "./dropdowns-data";

interface DropdownMenuProps {
  type: string;
}

interface DropTitleProps {
  isActive: boolean;
}

const ButtonMenuWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: max-content;
  width: max-content;
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

const DropdownMenu: FC<DropdownMenuProps> = ({ type }) => {
  //Из базы Dropdowns вытаскиваем подходящий дропдаун
  const initDropData =
    dropdownsData.find((d) => d.title === type) || dropdownsData[0];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initDropData.list[2].title);
  const list = initDropData.list;
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = () => {
    setOpen(!open);
  };

  // Выбранную яйчейку помещаем в селектор.
  const handleSelect = (selectId: number) => {
    setSelected(list.find((i) => i.id === selectId)?.title || "");
  };

  // Закрываем dropdown при нажатии на другую область
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: any) => {
      if (!buttonRef.current) return;
      if (!buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  return (
    <ButtonMenuWrapper onClick={() => handleOpenDropdown()} ref={buttonRef}>
      <SelectTitle isActive={open}>
        {selected}
        <ArrowImg src={arrow} alt="" isActive={open} />
      </SelectTitle>
      {open && (
        <Dropdown>
          {list.map((i, index) => (
            <DropdownTitle
              key={index}
              isActive={i.title === selected}
              onClick={() => handleSelect(i.id)}
            >
              {i.title}
            </DropdownTitle>
          ))}
        </Dropdown>
      )}
    </ButtonMenuWrapper>
  );
};

export default DropdownMenu;
