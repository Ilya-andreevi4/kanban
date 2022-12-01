import { ITaskList } from "../../models/ITaskList";
import arrow from "../../assets/arrow.svg";
import React, { FC, useState } from "react";
import styled from "styled-components";

interface TaskListsProps {}
const TaskListsWrapper = styled.div`
  padding: 16px;
  color: white;
`;
const TasksUl = styled.ul`
  text-align: left;
  list-style: none;
`;
const TaskSection = styled.li`
  margin-bottom: 22px;
`;
const TaskTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  color: white;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
`;
const Task = styled.li`
  color: #8c939f;
  font-size: 14px;
  line-height: 16px;
  margin-top: 16px;
  cursor: pointer;
`;

const TaskLists: FC<TaskListsProps> = () => {
  const [tasks, setTasks] = useState<ITaskList[]>([
    { title: "Favorites", tasks: ["Marketing", "Mobile App"] },
    {
      title: "My Projects",
      tasks: [
        "Marketing",
        "Landing Pages",
        "Wedding",
        "Mobile App",
        "House Construction",
      ],
    },
  ]);
  return (
    <TaskListsWrapper>
      <TasksUl>
        {tasks &&
          tasks.map((tl, idx) => (
            <TaskSection key={idx}>
              <TaskTitle>
                <img src={arrow} alt="" />
                {tl.title}
              </TaskTitle>
              <TasksUl>
                {tl.tasks.map((t, idx) => (
                  <Task key={idx}>{t}</Task>
                ))}
              </TasksUl>
            </TaskSection>
          ))}
      </TasksUl>
    </TaskListsWrapper>
  );
};

export default TaskLists;
