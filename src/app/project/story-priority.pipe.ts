import { Pipe, PipeTransform } from '@angular/core';
import { StoryPriority, ProjectsService } from '../services/shared/projects/projects.service';

@Pipe({
  name: 'storyPriority'
})
export class StoryPriorityPipe implements PipeTransform {
  private _storyPriorities: StoryPriority[];
  constructor(private projectsService: ProjectsService) {
    this._storyPriorities = projectsService.storyPriorities;
  }

  transform(value: number, attr: string): string {
    return this._storyPriorities[value || 0][attr];
  }

}
