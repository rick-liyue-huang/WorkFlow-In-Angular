import {ModuleWithProviders, NgModule} from '@angular/core';



@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ServicesModule,
      providers: []
    }

  }
}
