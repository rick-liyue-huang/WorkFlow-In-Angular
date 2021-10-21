import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskListModal, TaskModal} from '../domain';
import {Observable} from 'rxjs-compat';
import { from } from 'rxjs';
import { mergeMap, reduce, mapTo } from 'rxjs/operators';

@Injectable()
export class TaskService {

  private readonly domain =  'tasks';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: { uri: string }
  ) { }

  //  POST
  add(task: TaskModal): Observable<TaskModal> {
    task.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(task), {headers: this.headers}) as Observable<TaskModal>
    /*.map(res => res.json())*/
  }

  update(task: TaskModal): Observable<TaskModal> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      remark: task.remark
    };

    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers}) as Observable<TaskModal>
    /*.map(res => res.json())*/
  }

  // the challenge: delete task leads to delete task-lists and following contents
  // TODO: delete three layer contents
  delete(task: TaskModal): Observable<TaskModal> {

    const uri = `${this.config.uri}/taskLists/${task.id}`

    return this.http.delete(uri).mapTo(task);
  }

  // get task from taskList level
  get(taskListId: string): Observable<TaskModal[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'taskListId': taskListId}})
      .map(res => res as TaskModal[])
  }

  // get task from project level
  getByLists(lists: TaskListModal[]): Observable<TaskModal[]> {
    // return Observable.from(lists)
    //   .mergeMap(list => this.get(list?.id))
    //   .reduce((tasks: TaskModal[], t: TaskModal[]) => [...tasks, ...t], [])

    return from(lists).pipe(
      mergeMap((list: TaskListModal) => this.get(<string>list.id)),
      reduce((tasks: TaskModal[], t: TaskModal[]) => [...tasks, ...t], [])
    );
  }

  complete(task: TaskModal): Observable<TaskModal> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;

    return this.http
      .patch(uri, JSON.stringify({completed: !task.completed}), {headers: this.headers}) as Observable<TaskModal>
    /*.map(res => res.json())*/
  }

  move(taskId: string, taskListId: string): Observable<TaskModal> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;

    return this.http
      .patch(uri, JSON.stringify({taskListId: taskListId}), {headers: this.headers}) as Observable<TaskModal>
    /*.map(res => res.json())*/
  }

  moveAll(srcListId: string, targetListId: string): Observable<TaskModal[]> {

    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task  => this.move(<string>task.id, targetListId))
      .reduce((arr: TaskModal[], x: TaskModal) => [...arr, x],  []);
  }
}
