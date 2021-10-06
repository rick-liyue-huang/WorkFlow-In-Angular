import { NgModule } from '@angular/core';

import { DragDirectiveDirective } from './drag-directive.directive';
import { DropDirectiveDirective } from './drop-directive.directive';
import {DragDropService} from './drag-drop.service';



@NgModule({
  declarations: [
    DragDirectiveDirective,
    DropDirectiveDirective
  ],
  imports: [],
  exports: [
    DragDirectiveDirective,
    DropDirectiveDirective
  ],
  providers: [
    DragDropService
  ]
})
export class DirectiveModule { }
