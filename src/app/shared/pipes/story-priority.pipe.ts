import { Pipe, PipeTransform } from '@angular/core';

import { StoryPriority } from '../classes/projects.class';
import { ProjectsService } from '../../shared/services/projects.service';

@Pipe({
  name: 'storyPriority'
})
export class StoryPriorityPipe implements PipeTransform {
  constructor(private service: ProjectsService) { }

  transform(value: number, attr: string): string {
    const storyPriorities = this.service.storyPriorities;
    return storyPriorities[value || 0][attr];
  }

}
