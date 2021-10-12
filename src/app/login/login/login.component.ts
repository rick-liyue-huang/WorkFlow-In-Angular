import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuotesService} from '../../services/quotes.service';
import {QuoteModal} from '../../domain/quote.modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  form!: FormGroup;
  quote: QuoteModal = {
    "id": "9",
    "cn": "我总是对新的一天充满喜悦，这是一次新的尝试、一个新的开始，翘首以待，黎明之后或是惊喜。（约翰·博因顿·普里斯特利）",
    "en": "I have always been delighted at the prospect of a new day, a fresh try, one more start, with perhaps a bit of magic waiting somewhere behind the morning.",
    "pic": "/assets/img/quotes/9.jpg"
  }

  constructor(
    private fb: FormBuilder,
    private quoteService: QuotesService
  ) {
    this.quoteService.getQuote().subscribe(q => this.quote = q)
  }

  ngOnInit(): void {
    /*this.form = new FormGroup({
      email: new FormControl('aa@aa.com',
        Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.required)
    })*/
    this.form = this.fb.group({
      email: ['aa@a.com', Validators.compose([Validators.required, Validators.email, /*this.validate*/])],
      password: ['', Validators.required]
    })
  }

  onSubmit({value, valid}: {value: any, valid: any}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }


  validate(c: FormControl): Record<string, any> {
    if (!c.value) {
      return {'a': null};
    }
    const pattern = /^huang+/;
    if (pattern.test(c.value)) {
      return {'b': null};
    }
    return {
      emailNotValid: 'The email must start with huang'
    }
  }

}
