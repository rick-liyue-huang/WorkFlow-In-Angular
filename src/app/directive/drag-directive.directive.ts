import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragDropService} from './drag-drop.service';

@Directive({
  selector: '[appDragDirective][dragTag][dragData][draggedClass]'
})
export class DragDirectiveDirective {

  private _isDraggable = false;

  @Input('appDragDirective')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    this.rd2.setAttribute(this.elementRef.nativeElement, 'draggable', `${val}`);
  }

  get isDraggable() {
    return this._isDraggable;
  }

  @Input() draggedClass!: string;
  @Input() dragTag!: string;
  @Input() dragData!: any;

  constructor(
    private elementRef: ElementRef,
    private rd2: Renderer2,
    private service: DragDropService
  ) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.elementRef.nativeElement === ev.target) {
      this.rd2.addClass(this.elementRef.nativeElement, this.draggedClass)
      this.service.setDragData({tag: this.dragTag, data: this.dragData})
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.elementRef.nativeElement === ev.target) {
      this.rd2.removeClass(this.elementRef.nativeElement, this.draggedClass);
    }
  }

}
