import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {itemAnim} from '../../animations/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ]
})
export class TaskItemComponent implements OnInit {

  // TODO: item needs type
  @Input() item!: Record<string, any>;
  @Input() avatar!: any;
  @Output() editTask = new EventEmitter<void>();

  widerPriority = 'out';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'hover'
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'out';
  }

  constructor() { }

  ngOnInit(): void {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned'
  }

  onItemClick() {
    this.editTask.emit();
  }

  // prevent
  onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }

}
