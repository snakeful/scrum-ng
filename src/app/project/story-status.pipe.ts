import { Pipe, PipeTransform } from '@angular/core';
import { StoryStatus, ProjectsService } from '../services/shared/projects.service';

@Pipe({
  name: 'storyStatus'
})
export class StoryStatusPipe implements PipeTransform {
  private _storyStatus: StoryStatus[];
  constructor(private projectsService: ProjectsService) {
    this._storyStatus = projectsService.storyStatus;
  }

  transform(value: number, attr: string): string {
    return this._storyStatus[value || 0][attr];
  }

}
