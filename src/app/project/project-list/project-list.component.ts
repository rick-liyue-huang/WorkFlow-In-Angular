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
      name: 'business platform',
      desc: 'one description',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      name: 'business platform',
      desc: 'one description',
      coverImg: 'assets/img/covers/1.jpg'
    },
    {
      name: 'business platform',
      desc: 'one description',
      coverImg: 'assets/img/covers/2.jpg'
    },
  ];

  // if use dialog must use like this
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  launchNewProjectDialog() {
    // the properly open dialog way
    // const newProjectRef = this.dialog.open(NewProjectComponent,
    //   // TODO: 'dark' need to be switched automatically
    //   {width: '20rem', height: '20rem', data: {dark: true} /*position: {left: '0', top: '0'}*/});
    // // here has to match with the newProject data sent back
    const newProjectRef = this.dialog.open(NewProjectComponent,
      // TODO: 'dark' need to be switched automatically
      {width: '20rem', height: '20rem', data: {title: 'New Project'} /*position: {left: '0', top: '0'}*/});
    newProjectRef.afterClosed().subscribe(result => console.log(result));
  }

  // TODO: need to set theme switch
  launchInviteDialog() {
    const inviteDialogRef = this.dialog.open(InviteComponent, {width: '20rem', height: '20rem'});
  }

  launchEditProjectDialog(project: Record<string, any>) {
    const newProjectRef = this.dialog.open(NewProjectComponent,
      {width: '20rem', height: '20rem', data: {title: 'Edit Project', project: project} /*position: {left: '0', top: '0'}*/});
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: {title: 'Delete Project', content: 'Are you sure to delete project'}});
    dialogRef.afterClosed().subscribe(console.log);
  }

}
