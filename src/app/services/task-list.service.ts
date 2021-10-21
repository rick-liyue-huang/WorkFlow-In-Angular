import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskListModal} from '../domain';
import {Observable} from 'rxjs-compat';
import { concat } from 'rxjs';
import { reduce, map, mapTo } from 'rxjs/operators';

@Injectable()
export class TaskListService {

  private readonly domain =  'taskLists';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: { uri: string }
  ) { }

  //  POST
  add(taskList: TaskListModal): Observable<TaskListModal> {
    taskList.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers}) as Observable<TaskListModal>
    /*.map(res => res.json())*/
  }

  update(taskList: TaskListModal): Observable<TaskListModal> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    };

    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers}) as Observable<TaskListModal>
    /*.map(res => res.json())*/
  }

  // the challenge: delete taskList leads to delete task-lists and following contents
  // TODO: delete three layer contents
  delete(taskList: TaskListModal): Observable<TaskListModal> {

    const uri = `${this.config.uri}/taskLists/${taskList.id}`;
    return this.http.delete(uri)
      .mapTo(taskList);
  }

  get(projectId: string): Observable<TaskListModal[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}})
      .map(res => res as TaskListModal[])
  }

//  swap the list
  swapOrder(src: TaskListModal, target: TaskListModal): Observable<TaskListModal[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;

    const drag$ = this.http.patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers});
    const drop$ = this.http.patch(dropUri, JSON.stringify({order: src.order}), {headers: this.headers});

    // TODO: swapOrder taskList
    // @ts-ignore
    return concat(drag$, drop$).pipe(reduce((arrs: TaskListModal[], list: TaskListModal) => [...arrs, list], [])) as Observable<TaskListModal[]>

  }

}
