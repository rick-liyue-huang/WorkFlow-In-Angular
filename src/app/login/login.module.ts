import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {SharedModule} from '../shared/shared.module';
import {LoginRoutingModule} from './login-routing.module';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
  ],

})
export class LoginModule { }
