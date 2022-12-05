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

interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  title: string;
}
interface DragTodo {
  id: number;
  type: string;
  currentColName: string;
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

  // const changeId = (
  //   currentTodoId: number,
  //   columnName: string,
  //   hoverTodoId: number
  // ) => {
  //   // Клонируем задачу с изменениями
  //   console.log("current todo: ", currentTodoId);
  //   console.log("hoverTodoId: ", hoverTodoId);

  //   // const cloneTodo: ITask = {
  //   //   ...currentTodo,
  //   //   id: hoverTodoId,
  //   //   column: columnName,
  //   // };

  //   //Index задачи до переноса:

  //   setTodos((prevState) => {

  //     const coppiedTodosArray = [...prevState];

  //     const prevTodo = coppiedTodosArray.find((t) => t.id === currentTodoId);

  //     // Есть два варианта:
  //     // 1) Задача переносится в другую колонку
  //     // 2) Задача переносится в область той же колонки
  //     // 1. Если задача перенесена в другую колонку:
  //     if (prevTodo?.column !== columnName) {
  //       coppiedTodosArray.map((t) => {
  //         let tIdx = t.id;
  //         // Уменьшить id в прошлой колонке у нижестоящих задач
  //         if (t.column === currentTodo.column && tIdx > currentIdx) {
  //           const newId = tIdx - 1;
  //           return { ...t, id: newId };
  //         }
  //         // Увеличить id в новой колонке у нижестоящих задач
  //         if (t.column === columnName) {
  //           if (tIdx >= hoverTodoId) {
  //             const newId = tIdx + 1;
  //             return { ...t, id: newId };
  //           }
  //           return t;
  //         }
  //         return t;
  //       });

  //     coppiedTodosArray.splice(currentTodoId, 1);
  //       coppiedTodosArray.push(cloneTodo);
  //       console.log(coppiedTodosArray);

  //       return coppiedTodosArray;
  //     }

  //     // 2. Задача переносится в область той же колонки: есть два варианта:
  //     // а) Задача переносится ниже
  //     // б) Задача переносится выше
  //     // if (currentTodo.column === columnName)
  //     else {
  //       coppiedTodosArray.map((t) => {
  //         if (t.column === columnName) {
  //           let tIdx = t.id;

  //           // а) Задача переносится ниже
  //           if (currentIdx < hoverTodoId) {
  //             // Все задачи ниже прошлого места и выше следующего места убавляют id
  //             if (tIdx > currentIdx && tIdx <= hoverTodoId) {
  //               const newId = tIdx - 1;
  //               return { ...t, id: newId };
  //             }
  //           }
  //           // б) Задача переносится выше
  //           else if (currentIdx > hoverTodoId) {
  //             // Все задачи выше прошлого места и ниже следующего места прибавляют id
  //             if (tIdx < currentIdx && tIdx >= hoverTodoId) {
  //               const newId = tIdx + 1;
  //               return { ...t, id: newId };
  //             }
  //             return t;
  //           }
  //           return t;
  //         }
  //         return t;
  //       });

  //       coppiedTodosArray.splice(currentTodoId, 1);
  //       coppiedTodosArray.push(cloneTodo);
  //       console.log(coppiedTodosArray);

  //       return coppiedTodosArray;
  //     }

  //     // Удаляем старую задачу
  //     // const prevTodoId = coppiedTodosArray.findIndex((t) => t === currentTodo);
  //     // coppiedTodosArray.splice(prevTodoId, 1);

  //     // // Делаем проверку на повтор id
  //     // if (coppiedTodosArray.some((t) => t.id === cloneTodo.id)) {
  //     //   coppiedTodosArray.map((t) => {
  //     //     if (t.column === columnName) {
  //     //       const tIdx = parseInt(t.id.split("/")[1]);
  //     //       if (tIdx >= cloneIdx) {
  //     //         const numCol = t.id.split("/")[0];
  //     //         const newId = numCol + "/" + (tIdx + 1);
  //     //         return { ...t, id: newId };
  //     //       } else return t;
  //     //     } else return t;
  //     //   });
  //     // }
  //     // coppiedTodosArray.push(cloneTodo);
  //     // console.log(coppiedTodosArray);

  //     // return coppiedTodosArray;
  //   });
  // };

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

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveHandler(dragIndex, hoverIndex);
      // todo.id = hoverIndex;
      setTodos((prevState) => {
        const cloneArr = [...prevState];
        cloneArr.map((t) => {
          if (t.id === todo.id) {
            return { ...t, id: hoverIndex };
          }
          return t;
        });
        return cloneArr;
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TaskTypes.CARD,
    item: () => {
      return { task, currentColumnName };
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;
      if (dropResult) {
        const { title } = dropResult;
        console.log("Целевое место: ", task.id);
        console.log("Перетаскиваемый таск: ", item.task);

        switch (title) {
          case NEW_TASK:
            changeTodoColumn(item.task, NEW_TASK);
            // changeId(item.task, NEW_TASK, task.id);
            break;
          case SCHEDULED:
            changeTodoColumn(item.task, SCHEDULED);
            // changeId(item.task, SCHEDULED, task.id);

            break;
          case IN_PROGRESS:
            changeTodoColumn(item.task, IN_PROGRESS);
            // changeId(item.task, IN_PROGRESS, task.id);
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
