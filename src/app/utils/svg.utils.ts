import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser'


export const loadSvgResource = (iconRegister: MatIconRegistry, sanitizer: DomSanitizer) => {

  const dayDir = `assets/img/days`;
  const avatarDir = `assets/img/avatar`

  iconRegister.addSvgIcon('adjust', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/adjust.svg'));
  iconRegister.addSvgIcon('day', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/day.svg'));
  iconRegister.addSvgIcon('month', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/month.svg'));
  iconRegister.addSvgIcon('week', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/week.svg'));
  iconRegister.addSvgIcon('projects', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/projects.svg'));
  iconRegister.addSvgIcon('project', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/project.svg'));
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29 ,30, 31];
  days.forEach(d => iconRegister.addSvgIcon(`day${d}`,
    sanitizer.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));

  iconRegister.addSvgIconSetInNamespace('avatars', sanitizer.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
}
