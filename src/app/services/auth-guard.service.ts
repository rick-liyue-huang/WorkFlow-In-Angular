import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.of(true);
  }
}
