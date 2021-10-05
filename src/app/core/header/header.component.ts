import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleTheme.emit(checked);
  }


}
