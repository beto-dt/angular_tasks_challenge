import {ITaskType} from "../../shared/components/task-card/task-card.component";

export interface IResponse<T> {
  data: T;
  message?: string;
}

export interface ITask {
  id?: number;
  title: string;
  description: string;
  status: ITaskType;
}
