import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs-compat';
import {extractInfo, getAddrByCode, isValidAddr} from '../../utils/identity.utils';
import {isValidDate} from '../../utils/date.utils';
import {Store} from '@ngrx/store';
import {registerAction} from '../../actions/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  items!: string[];
  form!: FormGroup;
  private readonly avatarName = 'avatars';

  sub!: Subscription;
  // identityElement = this.form.get('identity')!;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = nums.map(n => `avatars:svg-${n}`);
    this.form = this.fb.group({
      email: [''],
      name: [''],
      password: [''],
      repeat: [''],
      avatar: [img],
      dateOfBirth: ['1990-01-01'],
      identity: [''],
      address: ['']
    });


    //  from id to dateofbirth and address
    const id$ = this.form.get('identity')
      ?.valueChanges
      .debounceTime(300)
      //  @ts-ignore
      .filter(v => this.form.get('identity').valid);

    // @ts-ignore
    this.sub = id$.subscribe(id  => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr= getAddrByCode(info.addrCode);
        this.form.get('address')?.patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)){
        this.form.get('dateOfBirth')?.patchValue(info.dateOfBirth);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

  onSubmit({value, valid}: {value: any, valid: any}, ev: Event) {
    ev.preventDefault();
    if (!value) {
      return
    }
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));

    this.store.dispatch(registerAction(value))
  }

  onChange() {

  }



}
