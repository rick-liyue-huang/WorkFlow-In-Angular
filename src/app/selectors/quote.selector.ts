import {createSelector} from '@ngrx/store';
import { AppState } from './app.state';
import {QuoteModal} from '../domain';

export const selectQuote = createSelector(
  (state: AppState) => state.quote,
  (quote: QuoteModal) => quote
);
