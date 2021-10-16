import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  // TODO: item needs type
  @Input() item!: Record<string, any>;
  @Input() avatar!: any;
  @Output() editTask = new EventEmitter<void>();

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
