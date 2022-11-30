import * as React from "react";
import { FC } from "react";
import styled from "styled-components";

interface FlexProps {
  direction?: string;
  align?: string;
  justify?: string;
  margin?: string;
  padding?: string;
  children: any;
  gridColStart: number;
  gridColEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
}
const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  align-items: ${(props) => props.align || "stretch"};
  justify-content: ${(props) => props.justify || "stretch"};
  margin: ${(props) => props.margin || "0px"};
  grid-column-start: ${(props) => props.gridColStart};
  grid-column-end: ${(props) => props.gridColEnd};
  grid-row-start: ${(props) => props.gridRowStart};
  grid-row-end: ${(props) => props.gridRowEnd};
`;
const Flex: FC<FlexProps> = (props) => {
  return <StyledFlex {...props}>{props.children}</StyledFlex>;
};

export default Flex;
