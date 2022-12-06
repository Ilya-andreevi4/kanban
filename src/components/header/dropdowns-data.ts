export interface IItem {
  id: number;
  title: string;
}
export interface IDropdawn {
  title: string;
  list: IItem[];
}
export const dropdownsData: IDropdawn[] = [
  {
    title: "test",
    list: [
      { id: 0, title: "Error 1" },
      { id: 1, title: "Error 2" },
      { id: 2, title: "Error 3" },
    ],
  },
  {
    title: "view",
    list: [
      { id: 0, title: "Board view" },
      { id: 1, title: "Table view" },
      { id: 2, title: "Kanban" },
    ],
  },
  {
    title: "filter",
    list: [
      { id: 0, title: "Option 1" },
      { id: 1, title: "Option 2" },
      { id: 2, title: "Filter" },
    ],
  },
];
