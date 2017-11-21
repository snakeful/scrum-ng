import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { isNil } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../../shared/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private service: UsersService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.service.userIsLogged;
  }
}
