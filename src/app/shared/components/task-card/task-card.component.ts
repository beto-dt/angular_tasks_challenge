import { Component, Input } from '@angular/core';
import {ITask} from "../../../core/models/task.model";

export type ITaskType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const ITaskStatus = ['OPEN', 'PROGRESS', 'TESTING', 'DONE'];

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() type: ITaskType = 'OPEN';
  @Input() task!: ITask;
}
