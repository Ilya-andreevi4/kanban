import styled from "styled-components";
import { FC, useRef } from "react";
import { ITask } from "../../models/ITaskColumn";
import { useDrag, useDrop } from "react-dnd";
import { TaskTypes } from "../../models/TaskTypes";
import { COLUMN_NAMES } from "./tasks-data";
import type { Identifier, XYCoord } from "dnd-core";

interface StyledTaskProps {
  color: string;
  isComplieted: boolean;
  isDragging: boolean;
}

interface DragTodo {
  id: number;
  index: number;
  prevColumn: string;
}

interface TaskProps {
  index: number;
  task: ITask;
  moveHandler: (dragIndex: number, hoverIndex: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<ITask[]>>;
  currentColumnName: string;
}

const StyledTask = styled.div<StyledTaskProps>`
  display: flex;
  position: relative;
  padding: 15px;
  gap: 2px;
  border-radius: 8px;
  flex-direction: column;
  justify-items: center;
  text-align: left;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: ${({ isComplieted, color }) =>
    isComplieted ? "#F0F0F0" : color};
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
  cursor: pointer;
`;

const TaskDescription = styled.p<StyledTaskProps>`
  color: ${({ isComplieted }) => isComplieted && "#A5A5A5"};
  text-decoration-line: ${({ isComplieted }) => isComplieted && "line-through"};
`;

const TaskTime = styled.div<StyledTaskProps>`
  display: flex;
  position: relative;
  border-radius: 8px;
  color: ${({ isComplieted }) => (isComplieted ? "#A5A5A5" : "#662e1e")};
  font-size: 13px;
  line-height: 15px;
`;

const Task: FC<TaskProps> = ({ task, moveHandler, setTodos, index }) => {
  const changeTodoColumn = (currentTodoId: number, columnName: string) => {
    setTodos((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.id === currentTodoId ? columnName : e.column,
        };
      });
    });
  };

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragTodo,
    void,
    { handlerId: Identifier | null }
  >({
    accept: TaskTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(todo: DragTodo, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = todo.id;
      const hoverIndex = task.id;
      const dragCol = todo.prevColumn;
      const hoverCol = task.column;
      if (dragCol !== hoverCol) {
        changeTodoColumn(dragIndex, hoverCol);
      }

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      // console.log(hoverBoundingRect.bottom, hoverBoundingRect.top);

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveHandler(dragIndex, hoverIndex);
      todo.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TaskTypes.CARD,
    item: () => {
      return { id: task.id, index, prevColumn: task.column };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <StyledTask
      ref={ref}
      data-handler-id={handlerId}
      key={task.id}
      color={task.color}
      isDragging={isDragging}
      isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
    >
      <TaskDescription
        color={task.color}
        isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
        isDragging={isDragging}
      >
        {task.description}
      </TaskDescription>
      <TaskTime
        color={task.color}
        isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
        isDragging={isDragging}
      >
        {task.taskTime}
      </TaskTime>
    </StyledTask>
  );
};

export default Task;
