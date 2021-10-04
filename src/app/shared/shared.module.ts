import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class SharedModule { }
