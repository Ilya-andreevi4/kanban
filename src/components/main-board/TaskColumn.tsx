import React, { FC } from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import ITaskColumn, { ITask } from "../../models/ITaskColumn";
import { TaskTypes } from "../../models/TaskTypes";
import Task from "./Task";

interface ColumnProps {
  taskCol: ITaskColumn;
  todos: ITask[];
  moveHandler: (dragIndex: number, hoverIndex: number) => void;
  dropHandler: (
    dragIndex: number,
    currentCol: string,
    hoverIndex: number
  ) => void;
  setTodos: React.Dispatch<React.SetStateAction<ITask[]>>;
}

interface StyleColumnProps {
  isOver: boolean;
}

interface DragTodo {
  id: number;
  index: number;
  prevColumn: string;
}

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(16, 1fr);
  width: 19%;
  flex-direction: column;
`;

const TasksColumnWrapper = styled.div<StyleColumnProps>`
  grid-row: 2/17;
  display: flex;
  position: relative;
  background: ${({ isOver }) => isOver && "#e8ebef"};
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
  dropHandler,
  todos,
  setTodos,
}) => {
  const changeTodoColumn = (currentTodoId: number, columnName: string) => {
    setTodos((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          column: e.id === currentTodoId ? columnName : e.column,
        };
      });
    });
  };

  const currentTodos = todos.filter((todo) => todo.column === taskCol.title);

  const [{ isOver }, drop] = useDrop({
    accept: TaskTypes.CARD,
    drop: () => ({
      title: taskCol.title,
    }),
    hover(todo: DragTodo) {
      if (todo.prevColumn === taskCol.title) return;
      const dragIndex = todo.id;
      const dragTodo = todos.find((t) => t.id === dragIndex);
      if (!dragTodo) return;

      // Change todo's column
      const copyTodo: ITask = { ...dragTodo, column: taskCol.title };
      const coppiedTodosArr = Array.from(todos);
      const dragIdx = todos.findIndex((t) => t.id === dragIndex);
      coppiedTodosArr.splice(dragIdx, 1);
      coppiedTodosArr.push(copyTodo);
      setTodos(coppiedTodosArr);
      todo.prevColumn = taskCol.title;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const returnTodosForColumn = () => {
    return currentTodos.map((todo, index) => {
      return (
        <Task
          key={todo.id}
          task={todo}
          todos={todos}
          moveHandler={moveHandler}
          dropHandler={dropHandler}
          changeTodoColumn={changeTodoColumn}
          currentColumnName={todo.column}
          index={index}
        />
      );
    });
  };

  return (
    <ColumnWrapper key={taskCol.id}>
      <ColumnTitle>
        {taskCol.title}
        <NumberTasks>{currentTodos.length}</NumberTasks>
      </ColumnTitle>
      <TasksColumnWrapper title={taskCol.title} ref={drop} isOver={isOver}>
        {returnTodosForColumn()}
      </TasksColumnWrapper>
    </ColumnWrapper>
  );
};

export default TaskColumn;
