import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lightTheme = true;

  switchTheme(light: boolean) {
    light = !light;
    this.lightTheme = light
  }
}
