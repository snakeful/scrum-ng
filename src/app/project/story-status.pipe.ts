import { Pipe, PipeTransform } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { StoryStatus, ProjectsService } from '../services/shared/projects/projects.service';

@Pipe({
  name: 'storyStatus'
})
export class StoryStatusPipe implements PipeTransform {
  constructor(private service: ProjectsService, private alert: NotificationsService) {
  }

  transform(value: number, field: string): string {
    const storyStatus = this.service.storyStatus;
    if (storyStatus.length === 0) {
      return {
        name: 'Pending',
        desc: 'badge-warning'
      }[field];
    }
    return storyStatus[value || 0][field];
  }

}
