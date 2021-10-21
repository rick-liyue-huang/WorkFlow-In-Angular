import { NgModule } from '@angular/core';
import {QuoteService} from './quote.service';
import {ProjectService} from './project.service';
import {TaskListService} from './task-list.service';
import {TaskService} from './task.service';
import {UserService} from './user.service';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    QuoteService,
    ProjectService,
    TaskListService,
    TaskService,
    UserService,
    AuthService,
    AuthGuardService,
  ]
})
export class ServicesModule { }
