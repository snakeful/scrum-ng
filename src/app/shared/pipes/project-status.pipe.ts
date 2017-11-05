import { Pipe, PipeTransform } from '@angular/core';

import { ProjectStatus } from '../classes/projects.class';
import { ProjectsService } from '../../shared/services/projects.service';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {

  constructor(private service: ProjectsService) {}

  transform(value: number, field: string): string {
    const storyStatus = this.service.storyStatus;
    return storyStatus[value || 0][field];
  }

}
