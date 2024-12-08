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
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  todoStatus = ITaskStatus;
  isSlidePanelOpen = false;
  todoId: number | null = null;
  filterByStatus = '';
  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.taskService.getAllTodo(this.filterByStatus).subscribe({
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
  }

  onFilterByStatus(status: string) {
    this.filterByStatus = status;
    this.getAllTodos();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.todoId) {
        this.taskService
          .updateTodo(this.todoId, this.todoForm.value)
          .subscribe({
            next: (response) => {
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
      } else {
        this.taskService.addTodo(this.todoForm.value).subscribe({
          next: (response) => {
            this.getAllTodos();
            this.onCloseSlidePanel();
          },
        });
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onLoadTodoForm(item: ITask) {
    this.todoId = item.id!!;
    this.todoForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    this.openSlidePanel();
  }
}
