import { NgModule } from '@angular/core';
import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  StoreModule,
  compose,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import {quoteSuccessReducer} from './quote.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';



@NgModule({
  imports: [
    StoreModule.forRoot({
      quote: quoteSuccessReducer
    }),
    StoreDevtoolsModule.instrument({}),
    StoreRouterConnectingModule.forRoot()
  ],
})
export class AppStoreModule {}

