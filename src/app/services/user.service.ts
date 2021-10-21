import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProjectModal, UserModal} from '../domain';
import {Observable} from 'rxjs-compat';
import { from } from 'rxjs';
import { switchMap, filter, reduce } from 'rxjs/operators';


@Injectable()
export class UserService {

  private readonly domain =  'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: { uri: string }
  ) { }

  searchUsers(filter: string): Observable<UserModal[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email_like': filter}}) as Observable<UserModal[]>
  }

  getUsersByProjects(projectId: string): Observable<UserModal[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}}) as Observable<UserModal[]>  // match with 'projectIds'
  }

  // based on the single user to add project
  addProjectRef(user: UserModal, projectId: string): Observable<UserModal> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds  : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user);
    }
    return this.http
      .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers}) as Observable<UserModal>
  }

  // based on the single user to remove the project
  removeProjectRef(user: UserModal, projectId: string): Observable<UserModal> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds  : [];
    const index = projectIds.indexOf(projectId);

    if (index === -1) {
      return Observable.of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)]
    return this.http
      .patch(uri, JSON.stringify({projectIds: toUpdate}), {headers: this.headers}) as Observable<UserModal>
  }

  // based on the project to update the users
  batchUpdateProjectRef(project: ProjectModal): Observable<UserModal[]> {
    const projectId = <string>project.id;
    const memberIds = project.members ? project.members : [];
    return from(memberIds).pipe(
      // @ts-ignore
      switchMap((id) => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri);
      }),
      filter(
        (user: UserModal) =>
          user.projectIds ? user.projectIds.indexOf(projectId) < 0 : false
      ),
      switchMap((u: UserModal) => this.addProjectRef(u, projectId)),
      reduce((users: UserModal[], curr: UserModal) => [...users, curr], [])
    );
  }
}
