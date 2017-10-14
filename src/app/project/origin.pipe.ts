import { Pipe, PipeTransform } from '@angular/core';

import { Origin, ProjectsService } from '../services/shared/projects/projects.service';

@Pipe({
  name: 'origin'
})
export class OriginPipe implements PipeTransform {
  private origins: Origin[];
  constructor(private service: ProjectsService) {
    this.origins = [];
    service.getOrigins().
      subscribe(origins => {
        this.origins = origins;
      });
  }

  transform(value: number, field: string): string {
    if (this.origins.length === 0) {
      return {
        name: 'Generated',
        desc: 'badge-success'
      }[field];
    }
    return this.origins && this.origins[value][field] || '';
  }

}
