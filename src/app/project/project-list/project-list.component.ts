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

  openNewProjectDialog() {
    // the properly open dialog way
    const newProjectRef = this.dialog.open(NewProjectComponent,
      // TODO: 'dark' need to be switched automatically
      {width: '20rem', height: '20rem', data: {dark: true} /*position: {left: '0', top: '0'}*/});
    // here has to match with the newProject data sent back
    newProjectRef.afterClosed().subscribe(result => console.log(result));
  }

}
