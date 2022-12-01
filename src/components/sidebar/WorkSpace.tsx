import React, { FC } from "react";
import styled from "styled-components";
import avatar from "../../assets/avatar.svg";

interface WorkSpaceProps {}
const WorkSpaceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2d4071;
  color: white;
  height: 34px;
  width: 100%+32px;
  margin: 19px -16px 0px;
  padding: 6px 16px;
`;
const UserAvatar = styled.img``;

const WorkSpace: FC<WorkSpaceProps> = () => {
  return (
    <WorkSpaceWrapper>
      <UserAvatar src={avatar} alt="avatar" />
      My workspace
    </WorkSpaceWrapper>
  );
};

export default WorkSpace;
