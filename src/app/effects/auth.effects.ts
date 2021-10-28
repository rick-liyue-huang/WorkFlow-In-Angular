import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction, logoutAction,
  registerAction,
  registerFailureAction, registerSuccessAction
} from '../actions/auth.action';
import {UserModal} from '../domain';
import {Router} from '@angular/router';
import * as routerActions from '../actions/router.action';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
      ofType(loginAction),
      switchMap(({email, password}: {email: string; password: string}) =>
        this.authService.login(email, password).pipe(
          map(auth =>  loginSuccessAction({auth})),
          catchError((message: string) => of(loginFailureAction({message})))
        )
      )
    )
  ) ;


  register$ = createEffect(() => this.actions$.pipe(
      //@ts-ignore
      ofType(registerAction),
      switchMap((user: UserModal) =>
        this.authService.register(user).pipe(
          map(auth =>  loginSuccessAction({auth})),
          catchError((message: string) => of(registerFailureAction({message})))
        )
      )
    )
  ) ;

  logout$ = createEffect(() => this.actions$.pipe(
      ofType(logoutAction),
      map(() => new routerActions.Go({ path: ['/'] }))
    )
  ) ;


  loginAndNavigate$ = createEffect(() => this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => this.router.navigate(['/projects']))
    ), { dispatch: false }
  ) ;


  registerAndNavigate$ = createEffect(() =>
      this.actions$
        .pipe(
          ofType(registerSuccessAction),
          map(() => new routerActions.Go({ path: ['/project'] }))
        ), { dispatch: false }
  ) ;






  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
