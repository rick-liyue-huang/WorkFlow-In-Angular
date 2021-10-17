import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAll = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() editList = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onNewTaskClick() {
    this.newTask.emit();
  }

  onMoveAll() {
    this.moveAll.emit();
  }

  onDeleteList() {
    this.deleteList.emit();
  }

  onEditListClick() {
    this.editList.emit();
  }

}
