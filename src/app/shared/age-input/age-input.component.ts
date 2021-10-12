import {Component, forwardRef, OnInit, OnDestroy, Input} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {Observable, Subscription} from 'rxjs-compat';
import {subDays, subMonths,subYears, differenceInDays,
  differenceInMonths, differenceInYears, isBefore,
  parse, format, isValid, isDate, isFuture} from 'date-fns';
import {isValidDate} from '../../utils/date.utils';


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
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  form!: FormGroup;
  ageUnits = [
    {value: AgeUnit.Year, label: 'Year'},
    {value: AgeUnit.Month, label: 'Month'},
    {value: AgeUnit.Day, label: 'Day'}
  ];
  selectedUnit = AgeUnit.Year;

  sub!: Subscription;

  @Input() daysTop = 150;
  @Input() daysBottom = 0;
  @Input() monthTop = 24;
  @Input() monthBottom = 1;
  @Input() yearTop = 90;
  @Input() yearBottom = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() dtime = 300

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });

    const birthday = this.form.get('birthday')!;
    const ageNum = this.form.get(['age', 'ageNum'])!;
    const ageUnit = this.form.get(['age', 'ageUnit'])!;
    const age = this.form.get('age')!;

    const birthday$ = birthday.valueChanges
      .map(d => {
      return {date: d, from: 'birthday'}
      })
      .filter(_ => birthday.valid);

    const ageNum$ = ageNum.valueChanges.startWith(ageNum.value).debounceTime(this.dtime).distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges.startWith(ageUnit.value).debounceTime(this.dtime).distinctUntilChanged();

    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_n: any, _u: any) => {
      return this.toDate({age: _n, unit: _u})
    })
      .map(d => {
        return {date: d, from: 'age'}
      })
      .filter(_ => age.valid)

    const merged$ = Observable.merge(birthday$, age$).filter(_  => this.form.valid)

    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if(age.age !==  ageNum?.value) {
          this.selectedUnit = age.unit
          ageNum?.patchValue(age.age, {emitEvent: false})
        }
        if(age.unit !==  ageUnit?.value) {
          ageUnit?.patchValue(age.unit, {emitEvent: false})
        }
        this.propagateChange(d.date);
      }
      else {
        const ageToCompare = this.toAge(birthday?.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday?.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();

    return isBefore(subDays(now, this.daysTop), date) ?
      { age: differenceInDays(now, date), unit: AgeUnit.Day } :
        isBefore(subMonths(now, this.monthTop), date) ?
          { age: differenceInMonths(now, date), unit: AgeUnit.Month } :
          {
            age: differenceInYears(now, date),
            unit: AgeUnit.Year
          }
  }

  toDate(age: Age): string {
    const now = Date.now();
    const dateFormat = this.format;
    switch (age.unit) {
      case AgeUnit.Year:
        return format(subYears(now, age.age), dateFormat);
      case AgeUnit.Month:
        return format(subMonths(now, age.age), dateFormat);
      case AgeUnit.Day:
        return format(subDays(now, age.age), dateFormat);
      default:
        return '';
    }
  }


  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return {}
    }
    if (isValidDate(val)) {
      return {}
    }
    return {dateOfBirthInvalid: true}
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (isValidDate(val)) {
      return {}
    }
    return {birthdayInvalid: true}
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year:
          result = ageNumVal >= this.yearBottom && ageNumVal < this.yearTop;
          break;
        case AgeUnit.Month:
          result = ageNumVal >= this.monthBottom && ageNumVal < this.monthTop;
          break;
        case AgeUnit.Day:
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        default:
          break;
      }
      return result ? {} : {ageInvalid: true}
    }

  }

  private propagateChange = (_: any) => {}


  writeValue(obj: any) {
    if (obj) {
      this.form.get('birthday')?.patchValue(format(obj, this.format));
      const age = this.toAge(format(obj, this.format));
      this.form.get(['age', 'ageNum'])?.patchValue(age.age);
      this.form.get(['age', 'ageUnit'])?.patchValue(age.unit)
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

}
