import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {Observable, Subscription} from 'rxjs-compat';
import {toAge, toDate, isValidDate} from '../../utils/date.utils'
import {
  differenceInDays, differenceInMonths,
  differenceInYears,
  format,
  isBefore,
  isDate,
  isFuture,
  isValid,
  parse,
  subDays,
  subMonths,
  subYears
} from 'date-fns';
import {filter, map} from 'rxjs/operators';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    // TODO: will use when this component exist
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true, // this token will applied on multi component
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true, // this token will applied on multi component
    }
  ]
})
export class AgeInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private _propagateChange = (_: any) => {}

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsTop = 150;
  @Input() yearsBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() dTime = 300;

  form!: FormGroup;
  ageUnits = [
    {value: AgeUnit.Year, label: 'Year'},
    {value: AgeUnit.Month, label: 'Month'},
    {value: AgeUnit.Day, label: 'Day'}
  ];

  selectedUnit = AgeUnit.Year;
  sub!: Subscription;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });

    // input event to Observable
    const birthday = this.form.get('birthday')!;
    const ageNum = this.form.get(['age', 'ageNum'])!;
    const ageUnit = this.form.get(['age', 'ageUnit'])!;
    const age = this.form.get('age')!;

    const birthday$ = birthday
      ?.valueChanges
      .map(d => {
        return {
          date: d, from: 'birthday'
        }
    })
      .filter(_ => birthday.valid)
      .debounceTime(this.dTime)
      .distinctUntilChanged() as Observable<any>;

    const ageNum$ = ageNum
      ?.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.dTime)
      .distinctUntilChanged() as Observable<any>;

    const ageUnit$  =ageUnit
      ?.valueChanges
      .startWith(ageUnit?.value)
      .debounceTime(this.dTime)
      .distinctUntilChanged() as Observable<any>;

    const age$ = Observable.combineLatest(
      ageNum$,
      ageUnit$,
      (_num: number, _unit: AgeUnit) => this.toDate({ age: _num, unit: _unit })
    ).pipe(
      map((d) => ({ date: d, from: 'age' })),
      filter((_) => age.valid)
    ) as Observable<any>;

    const merged$ = Observable.merge(birthday$, age$).filter(_ => this.form.valid);

    // prevent the infinite change on date birthday
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum?.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          // match [(ngModel)]
          this.selectedUnit = age.unit;
          ageUnit?.patchValue(age.unit, {emitEvent: false});
        }
        // emit the valuechange to outer component
        this._propagateChange(d.date);
      }
      else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday?.patchValue(d.date, {emitEvent: false});
          this._propagateChange(d.date);
        }
      }
    })

    /*                              toAge
                                    /
      birthday: -----------------------d, from  -------------- d, from -------------
      ageNum: ---------- an --------- an  ---------- an  ----------
      ageUnit: -------------- an --------- an  ---------- an  ---------
      age:   -----------------a  --------- a
                              \ combineLatest
                               \ toDate, from  'from' used to different the sources from birthday or age
       date: -----------------d ---------- d ---------------
    * */


  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // write value such as set the initial value
  writeValue(obj: any): void {
    // set the initial value
    if (obj) {
      this.form.get('birthday')?.patchValue(format(obj, this.format));
      const age= this.toAge(format(obj, this.format));
      this.form.get(['age', 'ageNum'])?.patchValue(age.age);
      this.form.get(['age', 'ageUnit'])?.patchValue(age.unit);
    }
  }

  // the control component changed, it will notify the outer
  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  // similar as the above method
  registerOnTouched(fn: any): void {
  }

  validate(c: FormControl): {[key: string]: any} | null {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate((val))) {
      return null;
    }
    return {dateOfBirthInvalid: true}
  }

  validateDate(c: FormControl): {[key: string]: any} | null {
    const val = c.value;
    return isValidDate(val) ?
      null : {birthdayInvalid: true}
  }

  validateAge(ageNumKey: string, ageUnitKey: string)  {
    return (group: FormGroup): { [key: string]: any } | null  => {
      const ageNum  = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;

      const ageNumValue = ageNum.value;

      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumValue >= this.yearsBottom && ageNumValue < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumValue >= this.monthsBottom && ageNumValue < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumValue >= this.daysBottom && ageNumValue < this.daysTop;
          break;
        }
        default:
          break;
      }
      return result ? null : {ageInvalid: true}
    }
  }

  private toAge = (dateStr: string): Age => {
    const date = parse(dateStr);
    const now = Date.now();

    return isBefore(subDays(now, this.daysTop), date) ?
      {age: differenceInDays(now, date), unit: AgeUnit.Day} :
      isBefore(subMonths(now, this.monthsTop), date) ? {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
        {
          age: differenceInYears(now, date),
          unit: AgeUnit.Year
        };
  };

  private toDate = (age: Age): string => {
    const now = Date.now();
    const dateFormat = this.format;
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormat);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), dateFormat);
      }
      default:
        return '';
    }
  }


}
