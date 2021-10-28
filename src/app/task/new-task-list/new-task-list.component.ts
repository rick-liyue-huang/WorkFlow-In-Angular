import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskListComponent implements OnInit {

  title = '';

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewTaskListComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: [this.data.taskList ? this.data.taskList : '', Validators.required]
    })
  }

  onSubmit({value, valid}: {value: any, valid: any}, ev: Event) {
    if (!valid) {
      return
    }
    this.dialogRef.close(value);
  }

}
