import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TaskRoutingModule} from './task-routing.module';
import {NewTaskComponent} from './new-task/new-task.component';
import {TaskHeaderComponent} from './task-header/task-header.component';
import {TaskHomeComponent} from './task-home/task-home.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskItemComponent} from './task-item/task-item.component';
import {MoveTasksComponent} from './move-tasks/move-tasks.component';



@NgModule({
  declarations: [
    NewTaskComponent,
    TaskHeaderComponent,
    TaskHomeComponent,
    TaskListComponent,
    TaskItemComponent,
    MoveTasksComponent
  ],
  imports: [
    SharedModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
