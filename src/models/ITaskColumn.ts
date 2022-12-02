export interface ITask {
  id: number;
  description: string;
  color: string;
  taskTime: any;
  isComplieted: boolean;
}
export default interface ITaskColumn {
  id: number;
  title: string;
  tasks: ITask[];
}
