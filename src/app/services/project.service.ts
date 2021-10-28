import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProjectModal, UserModal} from '../domain';
import {Observable} from 'rxjs-compat';
import { mergeMap, count, switchMap, map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {

  private readonly domain =  'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: { uri: string }
  ) { }

  //  POST
  add(project: ProjectModal): Observable<ProjectModal> {
    // project.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers}) as Observable<ProjectModal>
      /*.map(res => res.json())*/
  }

  update(project: ProjectModal): Observable<ProjectModal> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg,
    };

    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers}) as Observable<ProjectModal>
    /*.map(res => res.json())*/
  }

  // the challenge: delete project leads to delete task-lists and following contents
  // TODO: delete three layer contents
  delete(project: ProjectModal): Observable<ProjectModal> {
    const delTasks$ = Observable
      .from(project.taskLists ?  project.taskLists : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();

    return delTasks$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }

  get(userId: string): Observable<ProjectModal[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'members_like': userId}})
      .map(res => res as ProjectModal[])
  }

  invite(projectId: string, users: UserModal[]): Observable<ProjectModal> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;

    return this.http
      .get(uri)
      .map(res => res as ProjectModal)
      .switchMap((project: ProjectModal) => {
        const existingMembers = project.members;
        const invitedIds = users.map(user => user.id);
        const newIds = _.union(existingMembers, invitedIds)
        return this.http
          .patch(uri, JSON.stringify({member: newIds}), {headers: this.headers})
          .map(res => res as ProjectModal)
      })



  }

}
