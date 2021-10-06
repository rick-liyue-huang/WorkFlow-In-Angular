import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {DragData, DragDropService} from './drag-drop.service';

@Directive({
  selector: '[appDropDirective][dropTags][dragEnterClass]'
})
export class DropDirectiveDirective {

  @Input() dragEnterClass!: string;
  @Input() dropTags: string[] = [];
  @Output() dropped  = new EventEmitter<DragData>();

  private data$!: any;


  constructor(
    private elementRef: ElementRef,
    private rd2: Renderer2,
    private service: DragDropService
  ) {
    this.data$ = this.service.getDragData().take(1)
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.elementRef.nativeElement === ev.target) {
      this.data$.subscribe((dragData: any) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.addClass(this.elementRef.nativeElement, this.dragEnterClass)
        }
      })

    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.elementRef.nativeElement === ev.target) {
      this.data$.subscribe((dragData: any) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.setProperty(ev, 'dataTransfer.effectAllowed','all');
          this.rd2.setProperty(ev, 'dataTransfer.dropEffect','move');
        } else {
          this.rd2.setProperty(ev, 'dataTransfer.effectAllowed','none');
          this.rd2.setProperty(ev, 'dataTransfer.dropEffect','none');
        }
      })
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.elementRef.nativeElement === ev.target) {
      this.data$.subscribe((dragData: any) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.removeClass(this.elementRef.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.elementRef.nativeElement === ev.target) {
      this.data$.subscribe((dragData: any) => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd2.removeClass(this.elementRef.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      })
    }
  }

}
