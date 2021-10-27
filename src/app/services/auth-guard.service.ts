import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs-compat';
import {select, Store} from '@ngrx/store';
import {defaultIfEmpty, map} from 'rxjs/operators';
import * as routerActions from '../actions/router.action';
import {AppState} from '../selectors/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private store: Store<AppState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(s => s.auth),
        map(auth => {
          const result = auth.token !== undefined && auth.token !== null;
          if (!result) {
            this.store.dispatch(new routerActions.Go({ path: ['/login'] }));
          }
          return result;
        }),
        defaultIfEmpty(false),

      )
  }
}
