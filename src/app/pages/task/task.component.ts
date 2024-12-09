import { Component, OnInit } from '@angular/core';

import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ITaskStatus, TaskCardComponent} from "../../shared/components/task-card/task-card.component";
import {ITask} from "../../core/models/task.model";
import {TaskService} from "../../core/services/task.service";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  taskForm!: FormGroup;
  tasks: ITask[] = [];
  todoStatus = ITaskStatus;
  isSlidePanelOpen = false;
  taskId: number | null = null;
  filterByStatus = 'ALL';
  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks(this.filterByStatus).subscribe({
      next: (response) => {
        this.tasks = response.data;
      },
    });
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
    this.taskForm.reset();
  }

  onFilterByStatus(status: string) {
    this.filterByStatus = status;
    this.getAllTasks();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.taskId) {
        this.taskService
          .updateTask(this.taskId, this.taskForm.value)
          .subscribe({
            next: (response) => {
              this.getAllTasks();
              this.onCloseSlidePanel();
              this.taskForm.reset();
            },
          });
      } else {
        this.taskService.addTask(this.taskForm.value).subscribe({
          next: (response) => {
            this.getAllTasks();
            this.onCloseSlidePanel();
            this.taskForm.reset();
          },
        });
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onLoadTaskForm(item: ITask) {
    this.taskId = item.id!!;
    this.taskForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    this.openSlidePanel();
  }
}
