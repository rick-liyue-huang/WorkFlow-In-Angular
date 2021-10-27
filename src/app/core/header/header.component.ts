import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import { AppState } from 'src/app/selectors/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs-compat';
import {AuthModal} from '../../domain'
import { selectAuth } from 'src/app/selectors/auth.selector';
import { logoutAction } from 'src/app/actions/auth.action';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() darkTheme = false;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  // move the svg loading to core module
  /*constructor(iconReg: MatIconRegistry, st: DomSanitizer) {
    iconReg.addSvgIcon('menu', st.bypassSecurityTrustResourceUrl('assets/img/icons/menu-2.svg'))
  }*/

  auth$!: Observable<AuthModal>

  constructor(private store: Store<AppState>) {
    this.auth$ = this.store.select(selectAuth)
  }

  ngOnInit(): void {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  logout() {
    this.store.dispatch(logoutAction())
  }

}
