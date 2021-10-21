import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {

  title: string = '';
  coverImages = [];
  form!: FormGroup;

  // here I can received the data from the trigger component.
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    /*private oc: OverlayContainer*/
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.coverImages= this.data.thumbnails;

    // confirm it is edit or new
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = 'Edit Project'
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [''],
        coverImg: [this.data.img]
      });
      this.title = 'New Project'
    }


    console.log(JSON.stringify(this.data));
    // TODO: received the data from project-list component
    // move to app.component.ts
    // this.oc.getContainerElement().classList.add(this.data.dark ? 'my-dark-theme' : '');
  }

  onSubmit({value, valid}: {value: any, valid: any}, ev: Event) {
    ev.preventDefault();

    if (!valid) {
      return
    }
    this.dialogRef.close(value);
  }

  /*onSaveProject() {
    this.dialogRef.close(`I received the data from you: ${this.data.dark}`);
  }*/

}
