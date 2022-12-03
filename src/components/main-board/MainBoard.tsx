import { useState } from "react";
import styled from "styled-components";
import plus from "../../assets/plus.svg";
import ITaskColumn, { ITask } from "../../models/ITaskColumn";
import TaskColumn from "./TaskColumn";
import taskColumnsData, { tasks } from "./tasks-data";

const MainBoardWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0px 10px;
  grid-column: 6/25;
  grid-row: 2/13;
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

const MainBoard = () => {
  const [taskColumns, setTaskColumns] =
    useState<ITaskColumn[]>(taskColumnsData);

  //TODO!
  const [todos, setTodos] = useState<ITask[]>(tasks);

  const moveTodoHandler = (dragIndex: number, hoverIndex: number) => {
    const dragTodo = todos[dragIndex];

    if (dragTodo) {
      setTodos((prevState) => {
        const coppiedStateArray = [...prevState];
        // remove item by "hoverIndex" and put "dragItem" instead
        const prevTodo = coppiedStateArray.splice(hoverIndex, 1, dragTodo);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevTodo[0]);

        return coppiedStateArray;
      });
    }
  };
  //TODO!

  return (
    <MainBoardWrapper>
      {taskColumns.map((taskCol) => (
        <TaskColumn
          taskCol={taskCol}
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
};

export default MainBoard;
