import { NgModule, SkipSelf, Optional } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser'
import {AppRoutingModule} from '../app-routing.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import {loadSvgResource} from '../utils/svg.utils';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: 'BASE_CONFIG', useValue: 'http://localhost:4200'}
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
