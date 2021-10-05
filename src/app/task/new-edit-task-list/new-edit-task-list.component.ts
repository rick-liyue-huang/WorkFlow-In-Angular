import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-edit-task-list',
  templateUrl: './new-edit-task-list.component.html',
  styleUrls: ['./new-edit-task-list.component.scss']
})
export class NewEditTaskListComponent implements OnInit {

  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewEditTaskListComponent>
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
  }

  onClick() {
    this.dialogRef.close(this.title);
  }

}
