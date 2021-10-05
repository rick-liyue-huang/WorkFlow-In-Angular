import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      name: 'project1',
      desc: 'project-desc-1',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: 'project2',
      desc: 'project-desc-2',
      coverImg: 'assets/img/covers/1.jpg'
    }
  ];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openNewProject() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: 'New Project'/*dark: false*/}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditProject() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: 'Edit Project'}});
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: 'Delete Project', content: 'Confirm Delete?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
