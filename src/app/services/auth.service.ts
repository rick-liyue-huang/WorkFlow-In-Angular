import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthModal, ProjectModal, UserModal} from '../domain';
import {Observable} from 'rxjs-compat';
import {throwError} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private readonly domain =  'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: { uri: string }
  ) { }

  //  POST
  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   *
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: UserModal): Observable<AuthModal> {
    const params = new HttpParams().set('email', user.email);
    const uri = `${this.config.uri}/users`;
    return this.http.get(uri, { params }).pipe(
      switchMap(res => {
        if ((<UserModal[]>res).length > 0) {
          return throwError('username existed');
        }
        return this.http
          .post(uri, JSON.stringify(user), { headers: this.headers })
          .pipe(map(r => ({ token: this.token, user: <UserModal>r })));
      })
    ) as Observable<AuthModal>
  }

  /**
   * 使用用户名和密码登录
   *
   * @param email 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(email: string, password: string): Observable<AuthModal> {
    const uri = `${this.config.uri}/users`;
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get(uri, { params }).pipe(
      map(res => {
        const users = <UserModal[]>res;
        if (users.length === 0) {
          throw new Error('Username or password incorrect');
        }
        return {
          token: this.token,
          user: users[0]
        };
      })
    );
  }

}
