import { Pipe, PipeTransform } from '@angular/core';

import { TaskStatus } from '../classes/projects.class';
import { ProjectsService } from '../../shared/services/projects.service';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  constructor(private service: ProjectsService) {

  }

  transform(value: number, field: string): string {
    const taskStatus = this.service.taskStatus;
    return taskStatus[value || 0][field || name];
  }

}
