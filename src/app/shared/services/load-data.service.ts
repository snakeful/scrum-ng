import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { StoryStatus } from '../classes/projects.class';
import { ProjectsService } from './projects.service';
import { UsersService } from './users.service';
import { ServiceBuilder } from 'selenium-webdriver/edge';

@Injectable()
export class LoadDataService implements Resolve<any> {

  constructor(private service: ProjectsService, private usersService: UsersService) { }

  resolve(): Promise<any> {
    return Promise.all([this.service.loadData(), this.usersService.loadData()]).then(() => Promise.resolve());
  }

}
