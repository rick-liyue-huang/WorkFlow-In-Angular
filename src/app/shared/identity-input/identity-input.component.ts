import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IdentityModal, IdentityType} from '../../domain';
import {Observable, Subject, Subscription} from 'rxjs-compat';


@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    // TODO: will use when this component exist
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true, // this token will applied on multi component
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true, // this token will applied on multi component
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private _propagateChange = (_: any) => {};
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();

  identityTypes = [
    {value: IdentityType.IdCard, label: 'ID Card'},
    {value: IdentityType.Insurance, label: 'Insurance'},
    {value: IdentityType.Passport, label: 'Passport'},
    {value: IdentityType.Military, label: 'Military'},
    {value: IdentityType.Other, label: 'Other'}
  ];
  identity: IdentityModal = {identityType: null, identityNo: null};
  private sub!: Subscription;

  constructor() { }

  ngOnInit(): void {
    const val$ = Observable.combineLatest(this.idNo, this.idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      }
    });

    this.sub = val$.subscribe(id =>  {
      this._propagateChange(id);
    })
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj;
    }
  }

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  validate(c: FormControl): {[key: string]: any} | null {
    const val = c.value;
    if (!val) {
      return null;
    }
    switch (val.identityType) {
      case IdentityType.IdCard:
        return this.validateIdCard(c);
      case IdentityType.Passport:
        return this.validatePassport(c);
      case IdentityType.Military:
        return this.validateMilitary(c);
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }

  validateIdCard(c: FormControl): {[key: string]: any} | null {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return {idInvalid: true};
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }

  validatePassport(c: FormControl): {[key: string]: any} | null {
    const val = c.value.identityNo;
    if (val.length !== 9) {
      return {idInvalid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }

  validateMilitary(c: FormControl): {[key: string]: any} | null {
    const val = c.value.identityNo;
    const pattern =/[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  // TODO: value maybe is null
  onIdNoChange(ev: Event) {
    //@ts-ignore
    const idNo = ev.target.value;
    this._idNo.next(idNo);
  }

  //  subject can be acted as Observable
  get idType(): Observable<IdentityType>{
    return this._idType.asObservable()
  }

  //  subject can be acted as Observable
  get idNo(): Observable<string>{
    return this._idNo.asObservable()
  }

}
