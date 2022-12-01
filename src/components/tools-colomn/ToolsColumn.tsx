import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import { ITool } from "../../models/ITool";
import iconRoadmap from "../../assets/tools-icon/icon_1.svg";
import iconScheldule from "../../assets/tools-icon/icon_2.svg";
import iconTasks from "../../assets/tools-icon/icon_3.svg";
import iconNotes from "../../assets/tools-icon/icon_4.svg";
import iconFiles from "../../assets/tools-icon/icon_5.svg";
import iconRoadmapActive from "../../assets/tools-icon/icon_1_active.svg";
import iconSchelduleActive from "../../assets/tools-icon/icon_2_active.svg";
import iconTasksActive from "../../assets/tools-icon/icon_3_active.svg";
import iconNotesActive from "../../assets/tools-icon/icon_4_active.svg";
import iconFilesActive from "../../assets/tools-icon/icon_5_active.svg";

interface ToolsColumnProps {}
interface ToolSectionProps {
  isActive: boolean;
}
const ToolsColumnWrapper = styled.div`
  position: relative;
  background: #f5f8fa;
  grid-column: 4/6;
  grid-row: 1/12;
  padding: 24px 16px 24px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;
const ToolsTitle = styled.h1`
  margin-left: 16px;
  font-size: 18px;
  line-height: 21px;
`;
const ToolsList = styled.ul`
  width: 100%;
  margin-top: 26px;
  list-style: none;
`;
const ToolIcon = styled.img``;
const ToolSection = styled.li<ToolSectionProps>`
  display: flex;
  position: relative;
  align-items: center;
  color: ${(props) => props.isActive && "#0094ff"};
  gap: 10px;
  width: 100%;
  height: 50px;
  padding-left: 10px;
  cursor: pointer;
  ${(props) =>
    props.isActive &&
    css`
      background: #fff;
      border-radius: 0px 8px 8px 0px;
      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        height: 50px;
        width: 4px;
        border-radius: 0px 10px 10px 0px;
        background: #0094ff;
      }
    `}
`;
const ToolsColumn: FC<ToolsColumnProps> = () => {
  const [tools, setTools] = useState<ITool[]>([
    {
      title: "Roadmap",
      id: 0,
      icon: iconRoadmap,
      iconActive: iconRoadmapActive,
      isActive: false,
    },
    {
      title: "Scheldule",
      id: 1,
      icon: iconScheldule,
      iconActive: iconSchelduleActive,
      isActive: true,
    },
    {
      title: "Tasks",
      id: 2,
      icon: iconTasks,
      iconActive: iconTasksActive,
      isActive: false,
    },
    {
      title: "Notes",
      id: 3,
      icon: iconNotes,
      iconActive: iconNotesActive,
      isActive: false,
    },
    {
      title: "Files",
      id: 4,
      icon: iconFiles,
      iconActive: iconFilesActive,
      isActive: false,
    },
  ]);
  const handleClick = (tool: ITool) => {
    if (tool.isActive) {
      return;
    } else {
      const newTools: ITool[] = tools.map((t) => {
        t.isActive && (t.isActive = false);
        t.id === tool.id && (t.isActive = true);
        return t;
      });
      return setTools(newTools);
    }
  };
  return (
    <ToolsColumnWrapper>
      <ToolsTitle>Tools</ToolsTitle>
      <ToolsList>
        {tools.map((t) => (
          <ToolSection
            key={t.id}
            isActive={t.isActive}
            onClick={() => handleClick(t)}
          >
            <ToolIcon src={t.isActive ? t.iconActive : t.icon} alt="" />
            {t.title}
          </ToolSection>
        ))}
      </ToolsList>
    </ToolsColumnWrapper>
  );
};

export default ToolsColumn;
