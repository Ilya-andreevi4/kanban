import ITaskColumn, { ITask } from "../../models/ITaskColumn";

const taskColumnsData: ITaskColumn[] = [
  {
    id: 0,
    title: "New task",
  },
  {
    id: 1,
    title: "Scheduled",
  },
  {
    id: 2,
    title: "In progress",
  },
  {
    id: 3,
    title: "Complieted",
  },
];
export default taskColumnsData;

// Second Variant:

export const COLUMN_NAMES = {
  NEW_TASK: "New task",
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In progress",
  COMPLIETED: "Complieted",
};

const { NEW_TASK, SCHEDULED, IN_PROGRESS, COMPLIETED } = COLUMN_NAMES;

export const tasks: ITask[] = [
  {
    id: 0,
    testId: "0/0",
    description: "Check email",
    color: "#ABE9CE",
    taskTime: "0:20h",
    column: NEW_TASK,
  },
  {
    id: 1,
    testId: "0/1",
    description: "Compare PPC agencies and make a report for Steven",
    color: "#D8DCFF",
    taskTime: "3:00h",
    column: NEW_TASK,
  },
  {
    id: 2,
    testId: "0/2",
    description: "Meeting with Amanda (PR department)",
    color: "#ABE9CE",
    taskTime: "0:30h",
    column: NEW_TASK,
  },
  {
    id: 3,
    testId: "0/3",
    description: "Get Patrick's approval for homepage new design",
    color: "#D8DCFF",
    taskTime: "0:20h",
    column: NEW_TASK,
  },
  {
    id: 4,
    testId: "1/0",
    description: "Check email",
    color: "#FFDFBA",
    taskTime: "0:20h",
    column: SCHEDULED,
  },
  {
    id: 5,
    testId: "1/1",
    description: 'Write a blogpost "7 best strategies for SEO in 2020"',
    color: "#FEC6B7",
    taskTime: "5:00h",
    column: SCHEDULED,
  },
  {
    id: 6,
    testId: "1/2",
    description: "New Ad copies for Manamaja",
    color: "#D9E6A2",
    taskTime: "2:00h",
    column: SCHEDULED,
  },
  {
    id: 7,
    testId: "2/0",
    description: "Check email",
    color: "#FFDFBA",
    taskTime: "0:20h",
    column: IN_PROGRESS,
  },
  {
    id: 8,
    testId: "2/1",
    description: "Record a video comment about last week's analytics report",
    color: "#F2BAE1",
    taskTime: "0:20h",
    column: IN_PROGRESS,
  },
  {
    id: 9,
    testId: "2/2",
    description: "Process all resumes for Content Marketer position",
    color: "#FFDFBA",
    taskTime: "1:00h",
    column: IN_PROGRESS,
  },
  {
    id: 10,
    testId: "3/0",
    description: "Check email",
    color: "#FFDFBA",
    taskTime: "0:20h",
    column: COMPLIETED,
  },
  {
    id: 11,
    testId: "3/1",
    description: "Weekly planning session",
    color: "#FFDFBA",
    taskTime: "0:45h",
    column: COMPLIETED,
  },
  {
    id: 12,
    testId: "3/2",
    description: "Create 5+ target audiences in Facebook for Samsung ...",
    color: "#FFDFBA",
    taskTime: "2:30h",
    column: COMPLIETED,
  },
  {
    id: 13,
    testId: "3/3",
    description: "Check FB Banner Design and give feedback",
    color: "#FFDFBA",
    taskTime: "0:20h",
    column: COMPLIETED,
  },
  {
    id: 14,
    testId: "3/4",
    description: "Check email",
    color: "#FFDFBA",
    taskTime: "0:20h",
    column: COMPLIETED,
  },
];
