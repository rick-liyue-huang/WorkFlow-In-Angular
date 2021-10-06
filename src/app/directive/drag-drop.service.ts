import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs-compat';

export interface DragData {
  tag: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  private _dragData = new BehaviorSubject<DragData | null>(null);

  constructor() { }

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
