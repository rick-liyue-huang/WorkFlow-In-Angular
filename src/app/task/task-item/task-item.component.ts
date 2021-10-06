import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {itemAnim} from '../../animation/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() item: any;
  @Input() avatar!: string;
  @Output() taskClick = new EventEmitter<void>();
  widerProperty = 'out';

  constructor() { }

  ngOnInit(): void {
    this.avatar = this.item.owner  ? this.item.owner.avatar : 'unassigned'
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerProperty = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerProperty = 'out';
  }




}
