export interface IITem {
  id: number;
  title: string;
  isActive: boolean;
}
export interface IDropdawn {
  title: string;
  isOpen: boolean;
  list: IITem[];
}
export const dropdownsData: IDropdawn[] = [
  {
    title: "test",
    isOpen: false,
    list: [
      { id: 0, title: "Error 1", isActive: false },
      { id: 1, title: "Error 2", isActive: false },
      { id: 2, title: "Error 3", isActive: true },
    ],
  },
  {
    title: "view",
    isOpen: false,
    list: [
      { id: 0, title: "Board view", isActive: false },
      { id: 1, title: "Table view", isActive: false },
      { id: 2, title: "Kanban", isActive: true },
    ],
  },
  {
    title: "filter",
    isOpen: false,
    list: [
      { id: 0, title: "Option 1", isActive: false },
      { id: 1, title: "Option 2", isActive: false },
      { id: 2, title: "Filter", isActive: true },
    ],
  },
];
