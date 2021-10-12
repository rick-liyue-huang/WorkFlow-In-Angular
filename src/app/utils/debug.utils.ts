// import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
// import 'rxjs/add/operator/do';
import { Observable } from 'rxjs-compat';

declare module 'rxjs-compat' {
  interface Observable<T> {
    debug: (...arg0: any) => Observable<T>;
  }
}

// @ts-ignore
Observable.prototype.debug = function (message: string) {
  // @ts-ignore
  return this.do(
    (next) => {
      if (!environment.production) {
        console.log(message, next);
      }
    },
    (err) => {
      if (!environment.production) {
        console.error('ERROR>>>', message, err);
      }
    },
    () => {
      if (!environment.production) {
        console.log('completed...');
      }
    }
  )
}
