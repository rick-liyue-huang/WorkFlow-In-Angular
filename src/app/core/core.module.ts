import {NgModule, SkipSelf, Optional} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from '../utils/svg.utils';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// load this module once and only once

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports: [
    SharedModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BrowserAnimationsModule
  ]
})
export class CoreModule {

  // skip itself and find the module from parents
  constructor(
    @Optional()
    @SkipSelf() parent: CoreModule,
    mir: MatIconRegistry,
    dst: DomSanitizer
  ) {
    if (parent) {
      throw new Error('core module exists already, cannot load again!!')
    }
    loadSvgResources(mir, dst);
  }
}
