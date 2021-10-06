import {Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {slidToRight} from '../../animation/router.anim';
import {listAnim} from '../../animation/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slidToRight,
    listAnim
  ]
})
export class ProjectListComponent implements OnInit {

  projects = [
    {
      "id": 1,
      name: 'project1',
      desc: 'project-desc-1',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      "id": 2,
      name: 'project2',
      desc: 'project-desc-2',
      coverImg: 'assets/img/covers/1.jpg'
    }
  ];

  @HostBinding('@routeAnim') state: any;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openNewProject() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: 'New Project'/*dark: false*/}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects,
        {id: 3, name: 'new project', desc: 'new desc', coverImg: 'assets/img/covers/1.jpg'},
        {id: 4, name: 'new project3', desc: 'new desc3', coverImg: 'assets/img/covers/6.jpg'}
      ]
    });
  }

  launchEditProject() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: 'Edit Project'}});
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchConfirmDialog(project: Record<string, any>) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: 'Delete Project', content: 'Confirm Delete?'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id)
    });
  }

}
