import { Pipe, PipeTransform } from '@angular/core';

import { StoryStatus, ProjectsService } from '../services/shared/projects/projects.service';

@Pipe({
  name: 'storyStatus'
})
export class StoryStatusPipe implements PipeTransform {
  constructor(private service: ProjectsService) { }

  transform(value: number, field: string): string {
    const storyStatus = this.service.storyStatus;
    return storyStatus[value || 0][field];
  }

}
