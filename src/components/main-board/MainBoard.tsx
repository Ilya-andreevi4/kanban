import { useState } from "react";
import styled from "styled-components";
import plus from "../../assets/plus.svg";
import { ITask } from "../../models/ITaskColumn";
import TaskColumn from "./TaskColumn";
import { tasks, taskColumnsData } from "./tasks-data";

const MainBoardWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0px 10px;
  grid-column: 6/25;
  grid-row: 2/13;
  max-height: 955px;
  min-width: 1040px;
  overflow-y: auto;
  border-bottom: 1px solid #f3f3f3;
  &::before {
    position: absolute;
    content: "";
    top: 56px;
    left: 0;
    height: 1px;
    width: 100%;
    background: #f3f3f3;
  }
  &::after {
    position: absolute;
    content: "";
    top: 0;
    right: 24%;
    height: 100%;
    width: 1px;
    background: #f3f3f3;
  }
`;

const CreateColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(16, 1fr);
  flex-direction: column;
  position: relative;
  width: 24%;
  height: 100%;
`;

const CreateColumnTitle = styled.div`
  display: flex;
  color: ${({ theme }) => theme.textSecondary};
  grid-row: 1/1;
  padding-top: 25px;
  padding-left: 36px;
  gap: 4px;
  text-align: left;
  align-items: flex-start;
  width: 100%;
  border-top: none;
  border-right: none;
`;

const CreateColumnBody = styled.div`
  grid-row: 2/17;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default function MainBoard() {
  const taskColumns = taskColumnsData;

  const [todos, setTodos] = useState<ITask[]>(tasks);

  const dropHandler = (dragId: number, currentCol: string) => {
    const dragTodo = todos.find((t) => t.id === dragId);
    const dragIdx = todos.findIndex((t) => t.id === dragId);
    if (dragTodo) {
      const copyTodo: ITask = { ...dragTodo, column: currentCol };
      const coppiedTodosArray = Array.from(todos);
      coppiedTodosArray.splice(dragIdx, 1);
      coppiedTodosArray.push(copyTodo);
      setTodos(coppiedTodosArray);
    }
  };
  const moveTodoHandler = (dragId: number, hoverIndex: number) => {
    const dragTodo = todos.find((t) => t.id === dragId);
    const dragIdx = todos.findIndex((t) => t.id === dragId);
    const hoverIdx = todos.findIndex((t) => t.id === hoverIndex);

    if (dragTodo) {
      const coppiedTodosArray = Array.from(todos);
      const [NewOrder] = coppiedTodosArray.splice(dragIdx, 1);
      coppiedTodosArray.splice(hoverIdx, 0, NewOrder);
      setTodos(coppiedTodosArray);
    }
  };

  return (
    <MainBoardWrapper>
      {taskColumns.map((taskCol) => (
        <TaskColumn
          key={taskCol.id}
          taskCol={taskCol}
          dropHandler={dropHandler}
          moveHandler={moveTodoHandler}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
      <CreateColumnWrapper>
        <CreateColumnTitle>
          <img src={plus} alt="" height={13} /> Create status
        </CreateColumnTitle>
        <CreateColumnBody></CreateColumnBody>
      </CreateColumnWrapper>
    </MainBoardWrapper>
  );
}
