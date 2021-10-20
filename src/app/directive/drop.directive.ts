import {Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2} from '@angular/core';
import {createHostListener} from '@angular/compiler/src/core';
import {Observable} from 'rxjs-compat';
import {DragData, DragDropService} from './drag-drop.service';

@Directive({
  selector: '[appDrop][dragEnterClass][dropTags]'
})
export class DropDirective {

  // apply this on task-list component
  @Input() dragEnterClass!: string;

  @Input() dropTags: string[] = [];

  @Output() dropped = new EventEmitter<DragData>();

  private data$!: Observable<any>;

  constructor(
    private el: ElementRef,
    private rd2: Renderer2,
    private service: DragDropService,
  ) {
    this.data$ = this.service.getDragData().take(1);
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      })

    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd2.setProperty(ev, 'dataTransfer,dropEffect', 'move');
        } else {
          this.rd2.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd2.setProperty(ev, 'dataTransfer,dropEffect', 'none');
        }
      })
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      })
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      })
    }
  }

}
