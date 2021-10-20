import { NgModule } from '@angular/core';
import { DragDirective } from './drag.directive';
import { DropDirective } from './drop.directive';
import {DragDropService} from './drag-drop.service';




@NgModule({
  declarations: [
    DragDirective,
    DropDirective,
  ],
  imports: [
  ],
  exports: [
    DragDirective,
    DropDirective,
  ],
  providers: [
    DragDropService
  ]
})
export class DirectiveModule { }
