import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {

  title: string = '';
  priorities = [
    {label: 'emergency', value: 1},
    {label: 'important', value: 2},
    {label: 'normal', value: 3}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) private data: Record<string, any>) { }

  ngOnInit(): void {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data.task))
  }

  onSaveClick() {

  }

}
