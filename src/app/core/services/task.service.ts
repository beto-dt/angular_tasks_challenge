import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IResponse, ITask} from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(status: string): Observable<IResponse<ITask[]>> {
    return this.http.get<IResponse<ITask[]>>(
      `${apiEndpoint.TaskEndpoint.getAllTask}/${status}`
    );
  }

  addTask(data: ITask): Observable<IResponse<ITask>> {
    return this.http.post<IResponse<ITask>>(
      `${apiEndpoint.TaskEndpoint.addTask}`,
      data
    );
  }

  updateTask(id: number, data: ITask): Observable<IResponse<ITask>> {
    return this.http.patch<IResponse<ITask>>(
      `${apiEndpoint.TaskEndpoint.updateTask}/${id}`,
      data
    );
  }
}
