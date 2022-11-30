import React, { FC } from "react";
import styled from "styled-components";

interface ToolsColumnProps {}
const ToolsColumnWrapper = styled.div`
  position: relative;
  background: #f5f8fa;
  grid-column: 4/6;
  grid-row: 1/12;
`;
const ToolsColumn: FC<ToolsColumnProps> = () => {
  return <ToolsColumnWrapper></ToolsColumnWrapper>;
};

export default ToolsColumn;
