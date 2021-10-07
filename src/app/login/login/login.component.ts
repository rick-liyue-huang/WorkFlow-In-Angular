import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
