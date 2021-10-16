import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskComponent} from '../new-task/new-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  // TODO: will change in future
  lists = [
    {
      id: 1,
      name: 'Ready',
      tasks: [
        {
          id: 1,
          desc: 'task one',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'rick',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: 'task two',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: 'leo',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),

        },
      ]
    },
    {
      id: 2,
      name: 'Processing',
      tasks: [
        {
          id: 1,
          desc: 'task three',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'claire',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'task four',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: 'aj',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date()
        },
      ]
    },
    {
      id: 3,
      name: 'Completed',
      tasks: [
        {
          id: 1,
          desc: 'task five',
          completed: true,
          priority: 2,
          owner: {
            id: 1,
            name: 'rick',
            avatar: 'avatars:svg-15'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          desc: 'task six',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: 'leo',
            avatar: 'avatars:svg-16'
          },
          dueDate: new Date()
        },
      ]
    }
  ]

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }

}
