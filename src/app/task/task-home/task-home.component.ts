import { Component, OnInit } from '@angular/core';

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
          owner: {
            id: 1,
            name: 'rick',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'task two',
          owner: {
            id: 1,
            name: 'leo',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
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
          owner: {
            id: 1,
            name: 'rick',
            avatar: 'avatars:svg-15'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: 'task six',
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

  constructor() { }

  ngOnInit(): void {
  }

  launchNewTaskDialog() {

  }

}
