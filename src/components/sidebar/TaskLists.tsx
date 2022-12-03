import arrow from "../../assets/arrow.svg";
import { useState } from "react";
import styled from "styled-components";

interface ITaskList {
  title: string;
  tasks: string[];
}
const TaskListsWrapper = styled.div`
  padding-top: 13px;
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
  cursor: pointer;
`;
const Task = styled.li`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 14px;
  line-height: 16px;
  margin-top: 16px;
  cursor: pointer;
`;

const TaskLists = () => {
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
