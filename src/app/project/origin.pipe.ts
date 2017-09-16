import { Pipe, PipeTransform } from '@angular/core';

import { Origin, ProjectsService } from '../services/shared/projects.service';

@Pipe({
  name: 'origin'
})
export class OriginPipe implements PipeTransform {
  private origins: Origin[];
  constructor(private projectsService: ProjectsService) {
    projectsService.getOrigins().then((origins) => {
      this.origins = origins;
    });
  }

  transform(value: number, field: string): string {
    return this.origins && this.origins[value][field] || '';
  }

}
