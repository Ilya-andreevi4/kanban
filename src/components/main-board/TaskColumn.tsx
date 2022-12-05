import React, { FC } from "react";
import { useDrop } from "react-dnd";
import styled, { css } from "styled-components";
import ITaskColumn, { ITask } from "../../models/ITaskColumn";
import { TaskTypes } from "../../models/TaskTypes";
import Task from "./Task";

interface ColumnProps {
  taskCol: ITaskColumn;
  todos: ITask[];
  moveHandler: (dragIndex: number, hoverIndex: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<ITask[]>>;
  colKey: number;
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
  overflow-y: auto;
  flex-direction: column;
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
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 9px;
  border-radius: 100px;
  height: max-content;
  width: max-content;
`;

const TaskColumn: FC<ColumnProps> = ({
  taskCol,
  moveHandler,
  todos,
  setTodos,
  colKey,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: TaskTypes.CARD,
    drop: () => ({ title: taskCol.title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getBackgroundColor = () => {
    if (isOver) {
      return "#e8ebef";
    } else {
      return "";
    }
  };

  const returnTodosForColumn = (columnName: string, colKey: number) => {
    return todos
      .filter((todo) => todo.column === columnName)
      .sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
      .map((todo, index) => (
        <Task
          key={todo.id}
          task={todo}
          moveHandler={moveHandler}
          currentColumnName={todo.column}
          setTodos={setTodos}
          index={index}
        />
      ));
  };
  return (
    <ColumnWrapper key={taskCol.id}>
      <ColumnTitle>
        {taskCol.title}
        <NumberTasks>
          {todos.filter((todo) => todo.column === taskCol.title).length}
        </NumberTasks>
      </ColumnTitle>
      <TasksColumnWrapper
        title={taskCol.title}
        ref={drop}
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {returnTodosForColumn(taskCol.title, colKey)}
      </TasksColumnWrapper>
    </ColumnWrapper>
  );
};

export default TaskColumn;
