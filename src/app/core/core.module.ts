import { NgModule, SkipSelf, Optional } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser'

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import {loadSvgResource} from '../utils/svg.utils';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
// here we only need load once, and import Optional and SkipSelf to avoid looping loading and load firstly configuration
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    iconRegister: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    if (parent) {
      throw new Error('Module exists already! don\'t need load again');
    }
    // in order to use svg as icon input
    loadSvgResource(iconRegister, sanitizer);
  }
}