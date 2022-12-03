import styled from "styled-components";
import { FC, useRef } from "react";
import { ITask } from "../../models/ITaskColumn";
import { useDrag, useDrop } from "react-dnd";
import { TaskTypes } from "../../models/TaskTypes";
import { COLUMN_NAMES } from "./tasks-data";

interface StyledTaskProps {
  color: string;
  isComplieted: boolean;
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  title: string;
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
  setTodos,
  currentColumnName,
  index,
}) => {
  const changeTodoColumn = (currentTodo: ITask, columnName: string) => {
    setTodos((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.id === currentTodo.id ? columnName : e.column,
        };
      });
    });
  };

  const ref: React.MutableRefObject<any> = useRef(null);

  const [, drop] = useDrop({
    accept: TaskTypes.CARD,
    hover(todo: ITask, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = todo.id;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect =
        ref.current && ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset?.y
        ? clientOffset.y - hoverBoundingRect.top
        : "";
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
      todo.id = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: TaskTypes.CARD,
      item: { ...task, currentColumnName },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult() as DropResult;
        if (dropResult) {
          const { title } = dropResult;
          const { NEW_TASK, SCHEDULED, IN_PROGRESS, COMPLIETED } = COLUMN_NAMES;
          switch (title) {
            case NEW_TASK:
              changeTodoColumn(item, NEW_TASK);
              break;
            case SCHEDULED:
              changeTodoColumn(item, SCHEDULED);
              break;
            case IN_PROGRESS:
              changeTodoColumn(item, IN_PROGRESS);
              break;
            case COMPLIETED:
              changeTodoColumn(item, COMPLIETED);
              break;
            default:
              break;
          }
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );
  dragRef(drop(ref));
  return (
    <StyledTask
      ref={ref}
      style={{
        background: isDragging
          ? "red"
          : task.column === COLUMN_NAMES.COMPLIETED
          ? //   : task.isComplieted
            "#F0F0F0"
          : task.color,
      }}
      key={task.id}
      color={task.color}
      isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
    >
      <TaskDescription
        color={task.color}
        isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
      >
        {task.description}
      </TaskDescription>
      <TaskTime
        color={task.color}
        isComplieted={task.column === COLUMN_NAMES.COMPLIETED}
      >
        {task.taskTime}
      </TaskTime>
    </StyledTask>
  );
};

export default Task;
