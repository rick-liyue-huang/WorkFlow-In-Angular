import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskComponent} from '../new-task/new-task.component';
import {MoveTasksComponent} from '../move-tasks/move-tasks.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: 'ready',
      tasks: [
        {
          id: 1,
          desc: 'task 1',
          completed: false,
          reminder: new Date(),
          priority: 3,
          owner: {
            id: 1,
            name: 'rick',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'task 2',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: 'leo',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 2,
      name: 'processing',

      tasks: [
        {
          id: 1,
          desc: 'task 3',
          priority: 3,
          completed: false,
          owner: {
            id: 1,
            name: 'claire',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'task 4',
          priority: 1,
          completed: false,
          owner: {
            id: 1,
            name: 'aj',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 3,
      name: 'completed',
      tasks: [
        {
          id: 1,
          desc: 'task 5',
          priority: 3,
          completed: true,
          owner: {
            id: 1,
            name: 'rick',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'task 6',
          priority: 2,
          completed: true,
          owner: {
            id: 1,
            name: 'leo',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        }
      ]
    }

  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openNewProject() {

  }

  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent)
  }

  launchMoveTaskDialog() {
    const dialogRef = this.dialog.open(MoveTasksComponent, {data: {lists: this.lists}});
  }

}
