import React, { FC } from "react";
import styled from "styled-components";
import ITaskColumn from "../../models/ITaskColumn";

interface ColumnProps {
  taskCol: ITaskColumn;
}

interface TaskProps {
  color: string;
  isComplieted: boolean;
}

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(16, 1fr);
  width: 19%;
  flex-direction: column;
`;
const TasksColumnWrapper = styled.div`
  grid-row: 2/17;
  display: flex;
  position: relative;
  gap: 10px;
  padding: 39px 10px 0px 10px;
  height: 100%;
  flex-direction: column;
  /* border-right: 1px solid #f3f3f3; */
  border-right: ${({ title }) =>
    title !== "Complieted" ? "1px solid #f3f3f3" : "none"};
`;
const ColumnTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding-top: 12px;
  gap: 10px;
  grid-row: 1/1;
  position: relative;
`;
const NumberTasks = styled.div`
  background: #e8ebef;
  color: #8c939f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 9px;
  border-radius: 100px;
  height: max-content;
  width: max-content;
`;
const Task = styled.div<TaskProps>`
  display: flex;
  position: relative;
  padding: 15px;
  gap: 2px;
  border-radius: 8px;
  background: ${({ isComplieted, color }) =>
    isComplieted ? "#F0F0F0" : color};
  flex-direction: column;
  justify-items: center;
  text-align: left;
`;
const TaskDescription = styled.p<TaskProps>`
  color: ${({ isComplieted }) => isComplieted && "#A5A5A5"};
  text-decoration-line: ${({ isComplieted }) => isComplieted && "line-through"};
`;
const TaskTime = styled.div<TaskProps>`
  display: flex;
  position: relative;
  border-radius: 8px;
  color: ${({ isComplieted }) => (isComplieted ? "#A5A5A5" : "#662e1e")};
  font-size: 13px;
  line-height: 15px;
`;

const Column: FC<ColumnProps> = ({ taskCol }) => {
  return (
    <ColumnWrapper key={taskCol.id}>
      <ColumnTitle>
        {taskCol.title}
        <NumberTasks>{taskCol.tasks.length}</NumberTasks>
      </ColumnTitle>
      <TasksColumnWrapper title={taskCol.title}>
        {taskCol.tasks.map((task) => (
          <Task
            key={task.id}
            color={task.color}
            isComplieted={task.isComplieted}
          >
            <TaskDescription
              color={task.color}
              isComplieted={task.isComplieted}
            >
              {task.description}
            </TaskDescription>
            <TaskTime color={task.color} isComplieted={task.isComplieted}>
              {task.taskTime}
            </TaskTime>
          </Task>
        ))}
      </TasksColumnWrapper>
    </ColumnWrapper>
  );
};

export default Column;
