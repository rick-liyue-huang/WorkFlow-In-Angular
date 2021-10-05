import { Component } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lightTheme = true;

  constructor(private overlayContainer: OverlayContainer) {
  }

  switchTheme(dark: boolean) {
    this.lightTheme = !dark;
    this.overlayContainer.getContainerElement().classList.add(dark ? 'my-dark-theme' : '');
  }
}
