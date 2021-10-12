import {ModuleWithProviders, NgModule} from '@angular/core';
import {QuotesService} from './quotes.service';



@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ServicesModule,
      providers: [
        QuotesService
      ]
    }

  }
}
