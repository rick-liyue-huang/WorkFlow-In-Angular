import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs-compat';


export interface DragData {
  // tag can be the task-item or task-list
  tag: string;
  data: any;
}


@Injectable()
export class DragDropService {

  constructor() { }

  private _dragData = new BehaviorSubject<DragData | null>(null);

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData | null> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }

}
