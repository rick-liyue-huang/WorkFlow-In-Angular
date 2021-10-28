import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserModal} from '../domain';
import {Router} from '@angular/router';
import * as routerActions from '../actions/router.action';
import {ProjectService} from '../services/project.service';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import {
  addProjectAction, addProjectFailureAction,
  addProjectSuccessAction,
  deleteProjectAction,
  deleteProjectSuccessAction, inviteMemberAction, inviteMemberFailureAction, inviteMemberSuccessAction,
  loadProjectAction,
  loadProjectFailureAction,
  loadProjectSuccessAction, selectProjectDetailAction, updateProjectAction,
  updateProjectFailureAction, updateProjectSuccessAction
} from '../actions/project.action';
import { selectAuth } from '../selectors/auth.selector';


@Injectable()
export class ProjectsEffects {

  loadProjects$ = createEffect(() => this.actions$.pipe(
      ofType(loadProjectAction),
    // @ts-ignore
      withLatestFrom(this.store.select(selectAuth)),
      switchMap(([_, auth]) =>
        this.projectService.get(auth?.userId || '').pipe(
          map(projects => loadProjectSuccessAction({projects})),
          catchError(message =>
            of(loadProjectFailureAction({message}))
          )
        )
      )
    )
  ) ;



  addProject$ = createEffect(() => this.actions$.pipe(
      ofType(addProjectAction),
    map(action => action.project),
    // @ts-ignore
      withLatestFrom(this.store.select(selectAuth)),
      switchMap(([project, auth]) => {
        const added = { ...project, members: [`${auth?.userId || ''}`] };
        // @ts-ignore
        return this.projectService.add(added).pipe(
          map(project => addProjectSuccessAction({project})),
          catchError(message =>
            of(addProjectFailureAction({message}))
          )
        );
      })
    )
  ) ;


  updateProject$ = createEffect(() => this.actions$.pipe(
      ofType(updateProjectAction),
      map(action => action.project),
      switchMap(project =>
        this.projectService.update(project).pipe(
          map(project => updateProjectSuccessAction({project})),
          catchError(message =>
            of(updateProjectFailureAction({message}))
          )
        )
      )
    )
  ) ;


  deleteProject$ = createEffect(() => this.actions$.pipe(
      ofType(deleteProjectAction),
      map(action => action.project),
      switchMap(project =>
        this.projectService.delete(project).pipe(
          map(project => deleteProjectSuccessAction({project})),
          catchError(message =>
            of(updateProjectFailureAction({message}))
          )
        )
      )
    )
  ) ;


  selectProject$ = createEffect(() => this.actions$
    .pipe(
      ofType(selectProjectDetailAction),
      map(action => action.project),
      // map(project => new routerActions.Go({ path: [`/tasklists/${project.id}`] })),
      tap((project) => this.router.navigate([`/tasklists/${project.id}`]))
    ), { dispatch: false }
  )


  inviteMembers$ = createEffect(() => this.actions$.pipe(
      ofType(inviteMemberAction),
      switchMap(({projectId, members}: {projectId: string, members: UserModal[]}) =>
          this.projectService.invite(projectId, members).pipe(
          map(project => inviteMemberSuccessAction({project})),
          catchError(message =>
            of(inviteMemberFailureAction({message}))
          )
        )
      )
    )
  ) ;



  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private router: Router,
    private store: Store
  ) {}
}
