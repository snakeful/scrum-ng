import { Pipe, PipeTransform } from '@angular/core';
import { ProjectsService, TaskStatus } from '../services/projects/projects.service';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  private _taskStatus: TaskStatus[];
  constructor(private projectService: ProjectsService) {
    this._taskStatus = projectService.taskStatus;
  }

  transform(value: number): string {
    return this._taskStatus[value || 0].name;
  }

}
