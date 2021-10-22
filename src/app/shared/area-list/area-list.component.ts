import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AddressModal} from '../../domain';
import {Observable, Subject, Subscription} from 'rxjs-compat';
import {getCitiesByProvince, getDistrictByCityAndProvince, getProvinces} from '../../utils/area.utils';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    // TODO: will use when this component exist
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true, // this token will applied on multi component
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true, // this token will applied on multi component
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private _propagateChange = (_: any) => {}

  _address: AddressModal = {
    province: '',
    city: '',
    district: '',
    street: ''
  };

  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();

  sub!: Subscription;

  // get the supported data
  provinces$!: Observable<string[]>;
  cities$!: Observable<string[]>;
  districts$!: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
  //  deal with the prov city dist street stream together here
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');

    const val$ = Observable.combineLatest([province$, city$, district$, street$],
      (_p, _c,  _d, _s) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      }
    });

    this.sub = val$.subscribe(v => {
      // emit the value to outer component
      this._propagateChange(v);
    });

  //   get the data from back
    this.provinces$ = Observable.of(getProvinces());
    // this.cities$ = province$.map((p: string) => getCitiesByProvince(p));
    this.cities$ = province$.pipe(
      // TODO
      // @ts-ignore
      map((province) => getCitiesByProvince(province))
    );
    this.districts$ = Observable.combineLatest(province$, city$,
      (p: string, c: string) => {
      return getDistrictByCityAndProvince(p, c)
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: AddressModal): void {
    if (obj) {
      this._address = obj;
      if (this._address.province) {
        this._province.next(this._address.province)
      }
      if (this._address.city) {
        this._city.next(this._address.city)
      }
      if (this._address.district) {
        this._district.next(this._address.district)
      }
      if (this._address.street) {
        this._street.next(this._address.street)
      }
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
    if (val.province && val.city && val.district && val.street) {
      return null;
    }
    return {
      addressInvalid: true
    }
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }

}
