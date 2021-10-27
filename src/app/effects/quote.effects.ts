import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { QuoteService } from '../services/quote.service';
import {Observable} from 'rxjs-compat';
import {quoteAction, quoteFailureAction, quoteSuccessAction} from '../actions/quote.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class QuoteEffects {

  quote$ = createEffect(() => this.actions$.pipe(
    ofType(quoteAction),
    switchMap(() =>
      this.quoteService.getQuote().pipe(
        map(quote =>  quoteSuccessAction({quote})),
        catchError((message: string) => of(quoteFailureAction({message})))
      )
    )
  )
  ) ;


  constructor(
    private actions$: Actions,
    private quoteService: QuoteService,
  ) {}
}
