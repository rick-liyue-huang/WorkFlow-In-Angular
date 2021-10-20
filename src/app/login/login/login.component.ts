import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
