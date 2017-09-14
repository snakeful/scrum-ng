import { Pipe, PipeTransform } from '@angular/core';
import { StoryStatus, ProjectsService } from '../services/projects/projects.service';

@Pipe({
  name: 'storyStatus'
})
export class StoryStatusPipe implements PipeTransform {
  private _storyStatus: StoryStatus[];
  constructor(private projectsService: ProjectsService) {
    this._storyStatus = projectsService.storyStatus;
  }

  transform(value: number): StoryStatus {
    return this._storyStatus[value || 0];
  }

}
