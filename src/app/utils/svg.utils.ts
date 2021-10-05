import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser'


export const loadSvgResource = (iconRegister: MatIconRegistry, sanitizer: DomSanitizer) => {

  const iconDir = `assets/img/icons`
  const sidebarDir = `assets/img/sidebar`
  const dayDir = `assets/img/days`;
  const avatarDir = `assets/img/avatar`

  iconRegister.addSvgIcon('adjust', sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/adjust.svg`));
  iconRegister.addSvgIcon('day', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
  iconRegister.addSvgIcon('month', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
  iconRegister.addSvgIcon('week', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
  iconRegister.addSvgIcon('projects', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
  iconRegister.addSvgIcon('project', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29 ,30, 31];
  days.forEach(d => iconRegister.addSvgIcon(`day${d}`,
    sanitizer.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));

  iconRegister.addSvgIconSetInNamespace('avatars', sanitizer.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));

  iconRegister.addSvgIcon('move', sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`));
  iconRegister.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/add.svg`));
  iconRegister.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl(`${iconDir}/delete.svg`));
}
