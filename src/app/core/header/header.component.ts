import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();

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

}
