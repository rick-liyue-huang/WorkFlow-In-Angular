import {NgModule, SkipSelf, Optional} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {loadSvgResources} from '../utils/svg.utils';

// load this module once and only once

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
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
