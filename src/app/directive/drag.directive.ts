import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragDropService} from './drag-drop.service';

@Directive({
  selector: '[appDrag][draggedClass][dragTag][dragData]'
})
export class DragDirective {

  private _isDraggable = false;

  // this method will become the [appDrag] property for others, used in task-item component
  @Input('appDrag')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    // official define for draggable element
    this.rd2.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }

  // isDraggable is property
  get isDraggable() {
    return this._isDraggable;
  }

  @Input() draggedClass!: string;
  // match with drag-drop service tag
  @Input() dragTag!: string;
  @Input() dragData!: any;

  constructor(
    private el: ElementRef,
    private rd2: Renderer2,
    private service: DragDropService,
  ) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd2.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData})
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd2.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }

}
