import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {LoginModule} from './login/login.module';
import {ProjectModule} from './project/project.module';
import {TaskModule} from './task/task.module';
import {AppStoreModule} from './reducers';
import {AppEffectsModule} from './effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    AppStoreModule,
    AppEffectsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
