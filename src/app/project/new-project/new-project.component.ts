import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  // here I can received the data from the trigger component.
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private oc: OverlayContainer
  ) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    // TODO: received the data from project-list component
    this.oc.getContainerElement().classList.add(this.data.dark ? 'my-dark-theme' : '');
  }

  onSaveProject() {
    this.dialogRef.close(`I received the data from you: ${this.data.dark}`);
  }

}
