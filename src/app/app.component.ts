import {Component} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  squareState!: string;

  darkTheme = false;

  // deal with the whole project menu dialog theme switch
  constructor(private oc: OverlayContainer) {}

  switchTheme(dark: boolean) {
    this.darkTheme = dark;
    this.oc.getContainerElement().classList.add(dark ? 'my-dark-theme' : 'my-light-theme');
  }


}
