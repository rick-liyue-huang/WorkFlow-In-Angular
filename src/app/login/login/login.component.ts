import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuoteService} from '../../services/quote.service';
import {QuoteModal} from '../../domain/quote.modal';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs-compat';
import { selectQuote } from 'src/app/selectors/quote.selector';
import {quoteSuccessAction} from '../../actions/quote.action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  /*quote: QuoteModal = {
    "id": "9",
    "cn": "John Bostain",
    "en": "I have always been delighted at the prospect of a new day, a fresh try, one more start, with perhaps a bit of magic waiting somewhere behind the morning.",
    "pic": "/assets/img/quotes/9.jpg"
  };*/


  // @ts-ignore
  quote$ = this.store.select(selectQuote);

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private store: Store,
  ) {
    // this.quoteService.getQuote().subscribe(q => this.quote = q);
    this.quoteService.getQuote().subscribe(quote => this.store.dispatch(quoteSuccessAction({quote})) )
  }

  // TODO: maybe adjust the login card size by rem in .html
  ngOnInit(): void {
    /*this.form = new FormGroup({
      email: new FormControl('rick@gmail.com',  Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.required)
    })*/
    this.form = this.fb.group({
      email: ['rick@gmail.com', Validators.compose([
        Validators.required, Validators.email, this.validate
      ])],
      password: ['', Validators.required]
    });
  }

  onSubmit({value, valid}: {value: any, valid: any}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
    // this.form.controls['email'].setValidators(this.validate)
  }

//   self defined validator
  validate(c: FormControl): {[key: string]: any} | null {
    if (!c.value) {
      return null;
    }
    const pattern = /^huang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailValid: 'email name must start with huang'
    }
  }

}
