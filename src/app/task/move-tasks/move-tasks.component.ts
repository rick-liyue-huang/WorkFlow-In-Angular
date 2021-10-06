import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-move-tasks',
  templateUrl: './move-tasks.component.html',
  styleUrls: ['./move-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveTasksComponent implements OnInit {

  lists!: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<MoveTasksComponent>
  ) {

  }

  ngOnInit(): void {
    this.lists = this.data.lists;
  }

  onClick() {

  }

}
