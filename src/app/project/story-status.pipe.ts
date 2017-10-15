import { Pipe, PipeTransform } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { StoryStatus, ProjectsService } from '../services/shared/projects/projects.service';

@Pipe({
  name: 'storyStatus'
})
export class StoryStatusPipe implements PipeTransform {
  private storyStatus: StoryStatus[];
  constructor(private service: ProjectsService, private alert: NotificationsService) {
    this.storyStatus = [];
    service.storyStatus.subscribe(storyStatus => {
      this.storyStatus = storyStatus;
    }, err => {
      this.alert.error('Task Status', err, {
        timeOut: 10000
      });
    });
  }

  transform(value: number, field: string): string {
    if (this.storyStatus.length === 0) {
      return {
        name: 'Pending',
        desc: 'badge-warning'
      }[field];
    }
    return this.storyStatus[value || 0][field];
  }

}
