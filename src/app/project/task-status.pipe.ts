import { Pipe, PipeTransform } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ProjectsService, TaskStatus } from '../services/shared/projects/projects.service';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {
  private taskStatus: TaskStatus[];
  constructor(private service: ProjectsService, private alert: NotificationsService) {
    this.taskStatus = [];
    service.taskStatus.subscribe(taskStatus => {
      this.taskStatus = taskStatus;
    }, err => {
      this.alert.error('Task Status', err, {
        timeOut: 10000
      });
    });
  }

  transform(value: number, field: string): string {
    if (this.taskStatus.length === 0) {
      return {
        name: 'To Do',
        desc: 'badge-secondary'
      }[field || name];
    }
    return this.taskStatus[value || 0][field || name];
  }

}
