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

  getAllTodo(status: string): Observable<IResponse<ITask[]>> {
    let queryString = '';
    if (status !== '') {
      queryString = `status=${status}`;
    }
    return this.http.get<IResponse<ITask[]>>(
      `${apiEndpoint.TodoEndpoint.getAllTodo}?${queryString}`
    );
  }

  addTodo(data: ITask): Observable<IResponse<ITask>> {
    return this.http.post<IResponse<ITask>>(
      `${apiEndpoint.TodoEndpoint.addTodo}`,
      data
    );
  }

  updateTodo(id: number, data: ITask): Observable<IResponse<ITask>> {
    return this.http.put<IResponse<ITask>>(
      `${apiEndpoint.TodoEndpoint.updateTodo}/${id}`,
      data
    );
  }
}
