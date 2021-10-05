import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewProjectComponent} from '../new-project/new-project.component';

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
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {dark: true}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
