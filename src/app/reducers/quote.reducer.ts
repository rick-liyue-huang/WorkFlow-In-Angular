import {createReducer, on} from '@ngrx/store';
import {QUOTE, quoteSuccessAction} from '../actions/quote.action';
import {QuoteModal} from '../domain';


export const initialState: QuoteModal = {
  "id": "9",
  "cn": "John Bostain",
  "en": "I have always been delighted at the prospect of a new day, a fresh try, one more start, with perhaps a bit of magic waiting somewhere behind the morning.",
  "pic": "/assets/img/quotes/9.jpg"
}


export const quoteReducer = createReducer(QUOTE);
export const quoteSuccessReducer = createReducer(
  initialState,
  on(quoteSuccessAction, (state, {quote}) => quote)
);

























/*
import * as quoteActions from '../actions/quote.action'
import {QuoteModal} from '../domain';

export interface State {
  quote: QuoteModal
}


const initialState: State = {
  quote: {
    "id": "9",
    "cn": "John Bostain",
    "en": "I have always been delighted at the prospect of a new day, a fresh try, one more start, with perhaps a bit of magic waiting somewhere behind the morning.",
    "pic": "/assets/img/quotes/9.jpg"
  },
}



export function reducer(state: State, action: {type: string, payload: QuoteModal}): State {
  switch (action.type) {
    case quoteActions.QUOTE_SUCCESS: {
      return {
        ...state, quote: action.payload
      }
    }
    case quoteActions.QUOTE_FAILURE: {
      return {
        ...state, quote: action.payload
      }
    }
    case quoteActions.QUOTE: {
      return {
        ...state, quote: action.payload
      }
    }
    default:
      return {
        ...state, quote: action.payload
      }
  }
}
*/


