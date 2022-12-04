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
}

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  title: string;
}
interface DragTodo {
  index: string;
  id: string;
  type: string;
}

interface TaskProps {
  index: string;
  task: ITask;
  moveHandler: (dragIndex: string, hoverIndex: string) => void;
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
  const { NEW_TASK, SCHEDULED, IN_PROGRESS, COMPLIETED } = COLUMN_NAMES;
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

  const changeId = (currentTodo: ITask, columnName: string, index: string) => {
    // Получаем id таска на новом месте:
    // index задачи после переноса
    const cloneIdx = parseInt(index.split("/")[1]);
    const cloneFullId = { id: "" };
    if (columnName === NEW_TASK) {
      cloneFullId.id = "0/" + cloneIdx;
    } else if (columnName === SCHEDULED) {
      cloneFullId.id = "1/" + cloneIdx;
    } else if (columnName === IN_PROGRESS) {
      cloneFullId.id = "2/" + cloneIdx;
    } else if (columnName === COMPLIETED) {
      cloneFullId.id = "3/" + cloneIdx;
    }
    // Клонируем задачу с изменениями
    const cloneTodo: ITask = {
      ...currentTodo,
      id: cloneFullId.id,
      column: columnName,
    };
    console.log("clone todo: ", cloneTodo.id, index);

    //Index задачи до переноса:
    const currentIdx = parseInt(currentTodo.id.split("/")[1]);

    setTodos((prevState) => {
      const coppiedTodosArray = [...prevState];

      // Есть два варианта:
      // 1) Задача переносится в другую колонку
      // 2) Задача переносится в область той же колонки

      // 1. Если задача перенесена в другую колонку:
      if (currentTodo.column !== columnName) {
        coppiedTodosArray.map((t) => {
          const tIdx = parseInt(t.id.split("/")[1]);
          // Уменьшить id в прошлой колонке у нижестоящих задач
          if (t.column === currentTodo.column && tIdx > currentIdx) {
            const prevCol = t.id.split("/")[0];
            const newId = prevCol + "/" + (tIdx - 1);
            return { ...t, id: newId };
          }
          // Увеличить id в новой колонке у нижестоящих задач
          if (t.column === columnName) {
            if (tIdx >= cloneIdx) {
              const numCol = t.id.split("/")[0];
              const newId = numCol + "/" + (tIdx + 1);
              return { ...t, id: newId };
            }
            return t;
          }
          return t;
        });
      }

      // 2. Задача переносится в область той же колонки: есть два варианта:
      // а) Задача переносится ниже
      // б) Задача переносится выше
      if (currentTodo.column === columnName) {
        coppiedTodosArray.map((t) => {
          const tIdx = parseInt(t.id.split("/")[1]);

          // а) Задача переносится ниже
          if (currentIdx < cloneIdx) {
            // Все задачи ниже прошлого места и выше следующего места убавляют id
            if (tIdx > currentIdx && tIdx <= cloneIdx) {
              const numCol = t.id.split("/")[0];
              const newId = numCol + "/" + (tIdx - 1);
              return { ...t, id: newId };
            }
          }
          // б) Задача переносится выше
          if (currentIdx > cloneIdx) {
            // Все задачи ниже прошлого места и выше следующего места прибавляют id
            if (tIdx < currentIdx && tIdx >= cloneIdx) {
              const numCol = t.id.split("/")[0];
              const newId = numCol + "/" + (tIdx + 1);
              return { ...t, id: newId };
            }
          }
          return t;
        });
      }

      // Удаляем старую задачу
      const prevTodoId = coppiedTodosArray.findIndex((t) => t === currentTodo);
      coppiedTodosArray.splice(prevTodoId, 1);

      // Делаем проверку на повтор id
      if (coppiedTodosArray.some((t) => t.id === cloneTodo.id)) {
        coppiedTodosArray.map((t) => {
          if (t.column === columnName) {
            const tIdx = parseInt(t.id.split("/")[1]);
            if (tIdx >= cloneIdx) {
              const numCol = t.id.split("/")[0];
              const newId = numCol + "/" + (tIdx + 1);
              return { ...t, id: newId };
            } else return t;
          } else return t;
        });
      }
      coppiedTodosArray.push(cloneTodo);
      console.log(coppiedTodosArray);

      return coppiedTodosArray;
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
      const dragIndex = todo.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

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
      const dragId = dragIndex.split("/");
      const hoverId = hoverIndex.split("/");
      // Dragging downwards
      if (
        parseInt(dragId[1]) < parseInt(hoverId[1]) &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }

      // Dragging upwards
      if (
        parseInt(dragId[1]) > parseInt(hoverId[1]) &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }

      moveHandler(dragIndex, hoverIndex);
      todo.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TaskTypes.CARD,
    item: () => {
      return { task, index, currentColumnName };
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;
      if (dropResult) {
        const { title } = dropResult;
        // console.log("Целевое место: ", item.index);
        // console.log("Перетаскиваемый таск: ", item.task);

        switch (title) {
          case NEW_TASK:
            changeTodoColumn(item.task, NEW_TASK);
            // changeId(item.task, NEW_TASK, item.index);
            break;
          case SCHEDULED:
            changeTodoColumn(item.task, SCHEDULED);
            // changeId(item.task, SCHEDULED, item.index);

            break;
          case IN_PROGRESS:
            changeTodoColumn(item.task, IN_PROGRESS);
            // changeId(item.task, IN_PROGRESS, item.index);
            break;
          case COMPLIETED:
            changeTodoColumn(item.task, COMPLIETED);
            // changeId(item.task, COMPLIETED, item.index);
            break;
          default:
            break;
        }
      }
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
      style={{
        background: isDragging
          ? "#f5f8fa"
          : task.column === COLUMN_NAMES.COMPLIETED
          ? "#F0F0F0"
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
