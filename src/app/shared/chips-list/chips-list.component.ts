import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {UserModal} from '../../domain';
import {Observable} from 'rxjs-compat';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    // TODO: will use when this component exist
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true, // this token will applied on multi component
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true, // this token will applied on multi component
    }
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  private _propagateChange = (_: any) => {}

  @Input() multiple = true;
  @Input() placeholderText = 'please input member email';
  @Input() label = 'add/edit member';
  form!: FormGroup;
  items: UserModal[] = [];
  memberResults$!: Observable<UserModal[]>;


  constructor(
    private fb: FormBuilder,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      memberSearch: ['']
    });

    this.memberResults$ = this.form.get('memberSearch')
      ?.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      // transfer the input value to service
      .switchMap(str => this.service.searchUsers(str)) as Observable<UserModal[]>
  }

  writeValue(obj: UserModal[]): void {
    if (obj && this.multiple) {
      // transfer array to dictionary
      const userEntities = obj.reduce((e, c) => ({...e, c}), {})
      if (this.items) {
        // if the users exist, need to get the new user
        // TODO
        // @ts-ignore
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  validate(c: FormControl): {[key: string]: any} | null {
    return this.items ? null : {
      chipListInvalid: true
    };
  }

  removeMember(member: UserModal) {
    const ids = this.items.map(item => item.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({memberSearch: ''});
    this._propagateChange(this.items);
  }

  handleMemberSelection(member: UserModal) {
    // if the member existed in the members, do nothing
    if (this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return;
    }
    // if multiple, will put the new member inside, otherwise select the new one
    this.items  = this.multiple ? [...this.items, member] : [member];
    this.form.patchValue({memberSearch: member.name});
    this._propagateChange(this.items);
  }

  displayUser(user: UserModal): string {
    return user ? user.name : ''
  }

  get displayInput() {
    return this.multiple || this.items.length === 0;
  }

}
