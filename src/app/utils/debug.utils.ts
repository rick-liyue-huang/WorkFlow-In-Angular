import {Observable} from 'rxjs-compat';
import {environment} from '../../environments/environment';

declare module 'rxjs-compat' {
  interface Observable<T> {

    // @ts-ignore
    debug: (...any) => Observable<T>
  }
}
// @ts-ignore
Observable.prototype.debug = function(message: string) {
  // @ts-ignore
  return this.do(
    next => {
      if (!environment.production) {
        console.log(message,next);
      }
    },
    err => {
      if (!environment.production) {
        console.log('ERROR>>',err);
      }
    },
    () => {
      if (!environment.production) {
        console.log('Completed...');
      }
    }
  )
}
