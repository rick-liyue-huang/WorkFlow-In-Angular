import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser'

export const loadSvgResource = (iconRegister: MatIconRegistry, sanitizer: DomSanitizer) => {
  iconRegister.addSvgIcon('adjust', sanitizer.bypassSecurityTrustResourceUrl('assets/adjust.svg'));
}
