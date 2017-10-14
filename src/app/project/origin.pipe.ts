import { Pipe, PipeTransform } from '@angular/core';

import { Origin, ProjectsService } from '../services/shared/projects/projects.service';

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
    console.log(this.origins);
    return this.origins && this.origins[value][field] || '';
  }

}
