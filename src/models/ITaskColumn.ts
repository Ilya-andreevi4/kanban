export interface ITask {
  id: number;
  description: string;
  color: string;
  taskTime: any;
  column: string;
}

export default interface ITaskColumn {
  id: number;
  title: string;
}
