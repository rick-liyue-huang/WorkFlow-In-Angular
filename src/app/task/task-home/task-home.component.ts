import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewTaskComponent} from '../new-task/new-task.component';
import {MoveTaskComponent} from '../move-task/move-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';
import {routerAnim} from '../../animations/router.anim';
import {DragData} from '../../directive/drag-drop.service';
import {Store} from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs-compat';
import {TaskListModal} from '../../domain';
import {getTaskLists} from '../../selectors/task-list.selector';
import {addTaskListAction, deleteTaskListAction, updateTaskListAction} from '../../actions/task-list.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    routerAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent implements OnInit {

  // TODO: will change in future
  /*lists = [
    {
      id: 1,
      name: 'Ready',
      order: 1,
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
      order: 2,
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
      order: 3,
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
  ];*/

  @HostBinding('@route') state: any;

  projectId$!: Observable<string>;
  lists$!: Observable<TaskListModal[]>;


  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private store: Store,
    private route: ActivatedRoute,
  ) {
    // match with task-routing.module.ts
    this.projectId$ = this.route.paramMap.pluck('id');
    this.lists$ = this.store.select(getTaskLists)
  }

  ngOnInit(): void {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'New Task'}})
  }

  launchMoveTaskDialog() {
    // TODO: should filter itself
    // const dialogRef = this.dialog.open(MoveTaskComponent, {data: {lists: this.lists}, width: '20rem', height: '10rem'});
  }

  launchUpdateTaskDialog(task: any) {
    // TODO: input task content to dialog
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Edit Task', task: task}})
  }

  launchConfirmDialog(taskList: TaskListModal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: {title: 'Delete Task', content: 'Are you sure to delete task'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(result => this.store.dispatch(deleteTaskListAction({taskList})));
  }

  launchEditTaskListDialog(taskList: TaskListModal) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'Edit Task List', taskList: taskList}});
    dialogRef.afterClosed()
      .take(1)
      .subscribe(result => this.store.dispatch(updateTaskListAction({...result, id: taskList.id})));
  }

  launchNewTaskListDialog(ev: Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'New Task List'}});
    dialogRef.afterClosed()
      .take(1)
      .subscribe(result => this.store.dispatch(addTaskListAction({...result})));
  }

  handleMove(srcData: Record<string, any>, list: any) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        console.log('srcData: ', srcData)
        break;
      case 'task-list':
        console.log('handling list');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string) {
    console.log('desc: ', desc);
  }

}
