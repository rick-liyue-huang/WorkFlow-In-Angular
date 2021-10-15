import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() darkTheme = false;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  // move the svg loading to core module
  /*constructor(iconReg: MatIconRegistry, st: DomSanitizer) {
    iconReg.addSvgIcon('menu', st.bypassSecurityTrustResourceUrl('assets/img/icons/menu-2.svg'))
  }*/

  constructor() {
  }

  ngOnInit(): void {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

}
