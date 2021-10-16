import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgResources = (mir: MatIconRegistry, dst: DomSanitizer) => {
  const iconsDir = 'assets/img/icons';
  const sidebarDir = 'assets/img/sidebar';
  const dayDir = 'assets/img/days';
  const avatarDir= 'assets/img/avatar';

  mir.addSvgIcon('menu', dst.bypassSecurityTrustResourceUrl(`${iconsDir}/menu-2.svg`));
  mir.addSvgIcon('day', dst.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`))
  mir.addSvgIcon('month', dst.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`))
  mir.addSvgIcon('week', dst.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
  mir.addSvgIcon('project', dst.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
  mir.addSvgIcon('projects', dst.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));

  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  days.forEach(d => mir.addSvgIcon(`day${d}`, dst.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));


  mir.addSvgIconSetInNamespace('avatars', dst.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));

  mir.addSvgIcon('move', dst.bypassSecurityTrustResourceUrl(`${iconsDir}/move.svg`));
  mir.addSvgIcon('add', dst.bypassSecurityTrustResourceUrl(`${iconsDir}/add.svg`));
  mir.addSvgIcon('delete', dst.bypassSecurityTrustResourceUrl(`${iconsDir}/delete.svg`));

  mir.addSvgIcon('unassigned', dst.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));
}
