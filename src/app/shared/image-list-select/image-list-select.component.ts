import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() cols = 8;
  @Input() rowHeight = '20px';
  @Input() title = 'Select';
  @Input() items: string[] = [];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '10px';

  selected!: string;

  constructor() { }

  private propagateChange = (_: any) => {}

  onChange(i: number) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }

  writeValue(obj: any) {
    this.selected = obj;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? {} : {
      imageListInValid: {
        valid: false
      }
    };
  }
}
