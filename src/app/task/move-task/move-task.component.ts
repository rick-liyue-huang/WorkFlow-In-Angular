import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html',
  styleUrls: ['./move-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveTaskComponent implements OnInit {

  lists!: any[]
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<MoveTaskComponent>
  ) { }

  ngOnInit(): void {
    this.lists = this.data.lists;
  }

  onSaveMoveTask() {
    this.dialogRef.close();
  }

}
