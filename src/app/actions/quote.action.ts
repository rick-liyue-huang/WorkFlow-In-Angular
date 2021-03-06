/*export const QUOTE = 'QUOTE';
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
export const QUOTE_FAILURE = 'QUOTE_FAILURE';*/

import {createAction, props} from "@ngrx/store";
import {QuoteModal} from '../domain';


export const quoteAction = createAction('[QUOTE] QUOTE');

export const quoteSuccessAction = createAction(
  '[QUOTE] QUOTE_SUCCESS',
  props<{ quote: QuoteModal }>()
);

export const quoteFailureAction = createAction(
  '[QUOTE FAILURE] QUOTE_FAILURE',
  props<{message: string}>()
);




