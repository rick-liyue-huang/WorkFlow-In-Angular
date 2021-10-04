import { NgModule, SkipSelf, Optional } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
// here we only need load once, and import Optional and SkipSelf to avoid looping loading and load firstly configuration
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Module exists already! don\'t need load again');
    }
  }
}
