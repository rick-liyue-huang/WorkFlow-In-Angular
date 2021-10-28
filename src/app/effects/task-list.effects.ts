import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserModal} from '../domain';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { selectAuth } from '../selectors/auth.selector';
import { TaskListService } from '../services/task-list.service';
import {
  loadTaskListAction,
  loadTaskListSuccessAction,
  loadTaskListFailureAction,
  addTaskListAction,
  addTaskListSuccessAction,
  addTaskListFailureAction,
  updateTaskListAction,
  updateTaskListSuccessAction,
  updateTaskListFailureAction,
  deleteTaskListAction,
  deleteTaskListSuccessAction,
  deleteTaskListFailureAction,
  swapTaskListAction,
  swapTaskListSuccessAction,
  swapTaskListFailureAction,
} from '../actions/task-list.action';


@Injectable()
export class TaskListEffects {


  loadTaskLists$ = createEffect(() => this.actions$.pipe(
    ofType(loadTaskListAction),
    map(action => action.message),
    switchMap(projectId =>
      this.taskListService.get(projectId).pipe(
        map(taskLists => loadTaskListSuccessAction({taskLists})),
        catchError(message =>
          of(loadTaskListFailureAction({message}))
        )
      )
    ))
  ) ;


  addTaskList$ = createEffect(() => this.actions$.pipe(
    ofType(addTaskListAction),
    map(action => action.taskList),
    switchMap(taskList =>
      this.taskListService.add(taskList).pipe(
        map(taskList => addTaskListSuccessAction({taskList})),
        catchError(message =>
          of(loadTaskListFailureAction({message}))
        )
      )
    )
    )
  ) ;


  updateTaskList$ = createEffect(() => this.actions$.pipe(
      ofType(updateTaskListAction),
      map(action => action.taskList),
      switchMap(taskList =>
        this.taskListService.update(taskList).pipe(
          map(taskList => updateTaskListSuccessAction({taskList})),
          catchError(message =>
            of(updateTaskListFailureAction({message}))
          )
        )
      )
    )
  ) ;


  deleteTaskList$ = createEffect(() => this.actions$.pipe(
      ofType(deleteTaskListAction),
      map(action => action.taskList),
      switchMap(taskList =>
        this.taskListService.delete(taskList).pipe(
          map(taskList => deleteTaskListSuccessAction({taskList})),
          catchError(message =>
            of(updateTaskListFailureAction({message}))
          )
        )
      )
    )
  ) ;


  swap$ = createEffect(() => this.actions$.pipe(
    ofType(swapTaskListAction),
    switchMap(({ src, target }) =>
      this.taskListService.swapOrder(src, target).pipe(
        map(taskLists => swapTaskListSuccessAction({taskLists})),
        catchError(message => of(swapTaskListFailureAction({message})))
      )
    )
  )
  );






  constructor(
    private actions$: Actions,
    private taskListService: TaskListService,
    private router: Router,
    private store: Store
  ) {}
}
