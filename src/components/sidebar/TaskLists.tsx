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
`;
const TaskList = styled.li`
  color: #8c939f;
  font-size: 14px;
  line-height: 16px;
  margin-top: 16px;
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
          tasks.map((tl) => (
            <TaskSection>
              <TaskTitle>
                <img src={arrow} alt="" />
                {tl.title}
              </TaskTitle>
              <TasksUl>
                {tl.tasks.map((t) => (
                  <TaskList>{t}</TaskList>
                ))}
              </TasksUl>
            </TaskSection>
          ))}
      </TasksUl>
    </TaskListsWrapper>
  );
};

export default TaskLists;
