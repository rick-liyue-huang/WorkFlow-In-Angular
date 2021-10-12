import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs-compat';
import {QuoteModal} from '../domain/quote.modal';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config: any
  ) { }

  getQuote(): Observable<QuoteModal> {
    const uri  = `${this.config.uri}/quotes/${Math.floor(Math.random() * 9)}`
    return this.http.get(uri)
      .debug('quote: ')
      .map((res) => res as QuoteModal);
  }
}
