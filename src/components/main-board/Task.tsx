import styled from "styled-components";
import { FC, useRef } from "react";
import { ITask } from "../../models/ITaskColumn";
import { useDrag, useDrop } from "react-dnd";
import { TaskTypes } from "../../models/TaskTypes";
import { COLUMN_NAMES } from "./tasks-data";
import type { XYCoord } from "dnd-core";

interface StyledTaskProps {
  color: string;
  isComplieted: boolean;
  isDragging: boolean;
  isOver: boolean;
}

interface DragTodo {
  id: number;
  index: number;
  prevColumn: string;
}
interface dropItem {
  title: string;
}

interface TaskProps {
  index: number;
  task: ITask;
  moveHandler: (dragIndex: number, hoverIndex: number) => void;
  dropHandler: (dragIndex: number, currentCol: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<ITask[]>>;
  currentColumnName: string;
}

const StyledTask = styled.div<StyledTaskProps>`
  display: flex;
  position: relative;
  padding: ${({ isOver }) => (isOver ? "13px" : "15px")};
  min-width: 170px;
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
  border: ${({ isOver }) => (isOver ? "2px solid #e8ebef" : "none")};
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

const Task: FC<TaskProps> = ({
  task,
  moveHandler,
  dropHandler,
  setTodos,
  index,
}) => {
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

  const [{ isOver }, drop] = useDrop<DragTodo, void, { isOver: boolean }>({
    accept: TaskTypes.CARD,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
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

      // Change todo's column
      if (dragCol !== hoverCol) {
        changeTodoColumn(dragIndex, hoverCol);
      }

      // Don't replace todo with themselves
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      console.log(dragIndex, hoverIndex);
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveHandler(dragIndex, hoverIndex);
      todo.index = hoverIndex;
    },
  });

  const [{ isDragging, handlerId, dragTodo }, drag] = useDrag({
    type: TaskTypes.CARD,
    item: () => {
      return { id: task.id, index, prevColumn: task.column };
    },
    end: (todo, monitor) => {
      const dropResult: dropItem | null = monitor.getDropResult() || null;

      if (dropResult) {
        const { title } = dropResult;
        const { NEW_TASK, SCHEDULED, IN_PROGRESS, COMPLIETED } = COLUMN_NAMES;
        if (!isOver) {
          dropHandler(todo.id, title);
        } else
          switch (title) {
            case NEW_TASK:
              changeTodoColumn(todo.id, NEW_TASK);
              break;
            case SCHEDULED:
              changeTodoColumn(todo.id, SCHEDULED);
              break;
            case IN_PROGRESS:
              changeTodoColumn(todo.id, IN_PROGRESS);
              break;
            case COMPLIETED:
              changeTodoColumn(todo.id, COMPLIETED);
              break;
            default:
              break;
          }
      }
    },
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isDragging: monitor.isDragging(),
      dragTodo: monitor.getItem(),
    }),
  });

  drag(drop(ref));

  const checkDragging = () => {
    if (isDragging) return true;
    if (dragTodo) {
      if (task.column !== dragTodo.prevColumn && task.id === dragTodo?.id) {
        return true;
      }
    }
    return false;
  };

  return (
    <StyledTask
      ref={ref}
      data-handler-id={handlerId}
      key={task.id}
      color={task.color}
      isDragging={checkDragging()}
      isOver={isOver}
      isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
    >
      <TaskDescription
        isOver={isOver}
        color={task.color}
        isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
        isDragging={isDragging}
      >
        {task.description}
      </TaskDescription>
      <TaskTime
        isOver={isOver}
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
