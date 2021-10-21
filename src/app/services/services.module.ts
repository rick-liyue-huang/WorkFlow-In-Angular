import { NgModule } from '@angular/core';
import {QuoteService} from './quote.service';
import {ProjectService} from './project.service';
import {TaskListService} from './task-list.service';
import {TaskService} from './task.service';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    QuoteService,
    ProjectService,
    TaskListService,
    TaskService
  ]
})
export class ServicesModule { }
