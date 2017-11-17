import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { StoryStatus } from '../classes/projects.class';
import { ProjectsService } from './projects.service';

@Injectable()
export class LoadDataService implements Resolve<any> {

  constructor(private service: ProjectsService) { }

  resolve (): Promise<any> {
    return this.service.loadData();
  }

}
