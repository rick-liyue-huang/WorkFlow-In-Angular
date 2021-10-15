import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgResources = (mir: MatIconRegistry, dst: DomSanitizer) => {
  mir.addSvgIcon('menu', dst.bypassSecurityTrustResourceUrl('assets/img/icons/menu-2.svg'))
}
