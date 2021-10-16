import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskComponent} from '../new-task/new-task.component';
import {MoveTaskComponent} from '../move-task/move-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';

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
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'New Task'}})
  }

  launchMoveTaskDialog() {
    // TODO: should filter itself
    const dialogRef = this.dialog.open(MoveTaskComponent, {data: {lists: this.lists}, width: '20rem', height: '10rem'});
  }

  launchUpdateTaskDialog(task: any) {
    // TODO: input task content to dialog
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Edit Task', task: task}})
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: {title: 'Delete Task', content: 'Are you sure to delete task'}});
    dialogRef.afterClosed().subscribe(console.log);
  }

  launchEditTaskListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'Edit Task List'}});
    dialogRef.afterClosed().subscribe(console.log);
  }

  launchNewTaskListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'New Task List'}});
    dialogRef.afterClosed().subscribe(console.log);
  }
}
