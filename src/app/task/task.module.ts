import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {TaskRoutingModule} from './task-routing.module';
import {NewTaskComponent} from './new-task/new-task.component';
import {TaskHeaderComponent} from './task-header/task-header.component';
import {TaskHomeComponent} from './task-home/task-home.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskItemComponent} from './task-item/task-item.component';
import {MoveTasksComponent} from './move-tasks/move-tasks.component';
import { NewEditTaskListComponent } from './new-edit-task-list/new-edit-task-list.component';
import { QuickTaskComponent } from './quick-task/quick-task.component';



@NgModule({
  declarations: [
    NewTaskComponent,
    TaskHeaderComponent,
    TaskHomeComponent,
    TaskListComponent,
    TaskItemComponent,
    MoveTasksComponent,
    NewEditTaskListComponent,
    QuickTaskComponent
  ],
  imports: [
    SharedModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
