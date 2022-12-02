import ITaskColumn from "../../models/ITaskColumn";

const taskColumnsData: ITaskColumn[] = [
  {
    id: 0,
    title: "New task",
    tasks: [
      {
        id: 0,
        description: "Check email",
        color: "#ABE9CE",
        taskTime: "0:20h",
        isComplieted: false,
      },
      {
        id: 1,
        description: "Compare PPC agencies and make a report for Steven",
        color: "#D8DCFF",
        taskTime: "3:00h",
        isComplieted: false,
      },
      {
        id: 2,
        description: "Meeting with Amanda (PR department)",
        color: "#ABE9CE",
        taskTime: "0:30h",
        isComplieted: false,
      },
      {
        id: 3,
        description: "Get Patrick's approval for homepage new design",
        color: "#D8DCFF",
        taskTime: "0:20h",
        isComplieted: false,
      },
    ],
  },
  {
    id: 1,
    title: "Scheduled",
    tasks: [
      {
        id: 0,
        description: "Check email",
        color: "#FFDFBA",
        taskTime: "0:20h",
        isComplieted: false,
      },
      {
        id: 1,
        description: 'Write a blogpost "7 best strategies for SEO in 2020"',
        color: "#FEC6B7",
        taskTime: "5:00h",
        isComplieted: false,
      },
      {
        id: 2,
        description: "New Ad copies for Manamaja",
        color: "#D9E6A2",
        taskTime: "2:00h",
        isComplieted: false,
      },
    ],
  },
  {
    id: 2,
    title: "In progress",
    tasks: [
      {
        id: 0,
        description: "Check email",
        color: "#FFDFBA",
        taskTime: "0:20h",
        isComplieted: false,
      },
      {
        id: 1,
        description:
          "Record a video comment about last week's analytics report",
        color: "#F2BAE1",
        taskTime: "0:20h",
        isComplieted: false,
      },
      {
        id: 2,
        description: "Process all resumes for Content Marketer position",
        color: "#FFDFBA",
        taskTime: "1:00h",
        isComplieted: false,
      },
    ],
  },
  {
    id: 3,
    title: "Complieted",
    tasks: [
      {
        id: 0,
        description: "Check email",
        color: "#FFDFBA",
        taskTime: "0:20h",
        isComplieted: true,
      },
      {
        id: 1,
        description: "Weekly planning session",
        color: "#FFDFBA",
        taskTime: "0:45h",
        isComplieted: true,
      },
      {
        id: 2,
        description: "Create 5+ target audiences in Facebook for Samsung ...",
        color: "#FFDFBA",
        taskTime: "2:30h",
        isComplieted: true,
      },
      {
        id: 3,
        description: "Check FB Banner Design and give feedback",
        color: "#FFDFBA",
        taskTime: "0:20h",
        isComplieted: true,
      },
      {
        id: 4,
        description: "Check email",
        color: "#FFDFBA",
        taskTime: "0:20h",
        isComplieted: true,
      },
    ],
  },
];
export default taskColumnsData;
