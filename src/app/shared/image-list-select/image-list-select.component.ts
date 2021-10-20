import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

// this is one form control

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    // TODO: will use when this component exist
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true, // this token will applied on multi component
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true, // this token will applied on multi component
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() title  = 'Select'
  @Input() cols = 6;
  @Input() rowHeight = '5rem';
  @Input() items: string[] = [];
  // deal with icon and pictures
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';

  selected!: string;

  private _propagateChange = (_: any) => {}

  constructor() { }

  /*ngOnInit(): void {
  }*/

  // write value such as set the initial value
  writeValue(obj: any): void {
    this.selected = obj;
    this._propagateChange(this.selected);
  }

  // the control component changed, it will notify the outer
  registerOnTouched(fn: any): void {
    this._propagateChange = fn;
  }

  // similar as the above method
  registerOnChange(fn: any): void {
  }


  onChange(i: number) {
    this.selected = this.items[i];
  }

  validate(c: FormControl): {[key: string]: any} | null {
    return this.selected ? null : {imageListInvalid: {
      valid: false
      }
    };
  }

}
