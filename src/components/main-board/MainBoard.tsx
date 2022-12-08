import { useState } from "react";
import styled from "styled-components";
import plus from "../../assets/plus.svg";
import { ITask } from "../../models/ITaskColumn";
import TaskColumn from "./TaskColumn";
import { tasks, taskColumnsData } from "./tasks-data";

const MainBoardWrapper = styled.div`
  position: relative;
  display: flex;
  grid-column: 6/25;
  grid-row: 2/13;
  max-height: 955px;
  min-width: 1040px;
  overflow-y: auto;
  border-bottom: 1px solid #f3f3f3;
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
  border-left: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
`;

const CreateColumnBody = styled.div`
  grid-row: 2/17;
  display: flex;
  flex-direction: column;
  position: relative;
  border-left: 1px solid #f3f3f3;
`;

export default function MainBoard() {
  const taskColumns = taskColumnsData;

  const [todos, setTodos] = useState<ITask[]>(tasks);

  const dropHandler = (dragId: number, currentCol: string, hoverId: number) => {
    const dragTodo = todos.find((t) => t.id === dragId);
    if (!dragTodo) return;
    // Копируем туду с изменённой колонкой
    const copyTodo: ITask = { ...dragTodo, column: currentCol };
    const coppiedTodosArr = Array.from(todos);

    // Вырезаем переносимую туду и запушиваем обратно, чтобы она получила последний индекс и встала в низ колонки
    const hoverIdx = todos.findIndex((t) => t.id === hoverId);
    coppiedTodosArr.splice(hoverIdx, 1);
    coppiedTodosArr.push(copyTodo);

    setTodos(coppiedTodosArr);
  };

  const moveTodoHandler = (dragId: number, hoverId: number) => {
    const dragTodo = todos.find((t) => t.id === dragId);
    const dragIdx = todos.findIndex((t) => t.id === dragId);
    const hoverIdx = todos.findIndex((t) => t.id === hoverId);
    if (!dragTodo) return;
    const coppiedTodosArr = Array.from(todos);
    const [NewOrder] = coppiedTodosArr.splice(dragIdx, 1);
    coppiedTodosArr.splice(hoverIdx, 0, NewOrder);
    setTodos(coppiedTodosArr);
  };

  return (
    <MainBoardWrapper>
      {taskColumns.map((taskCol) => (
        <TaskColumn
          key={taskCol.id}
          taskCol={taskCol}
          moveHandler={moveTodoHandler}
          dropHandler={dropHandler}
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
