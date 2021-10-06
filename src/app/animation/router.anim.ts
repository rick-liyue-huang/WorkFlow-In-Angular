import {transition, trigger, animate, style, state, group} from '@angular/animations';

export const slidToRight =trigger('routeAnim', [
  state('void', style({'position': 'fixed', 'width': '100%', 'height': '90%'})),
  state('*', style({'position': 'fixed', 'width': '100%', 'height': '90%'})),
  transition(':enter', [
    style({transform: 'translateX(-100%)', opacity: 0}),
    group([
      animate('500ms ease-in-out', style({transform: 'translateX(0)'})),
      animate('300ms ease-in-out', style({opacity: 1}))
    ])
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)', opacity: 1}),
    group([
      animate('500ms ease-in-out', style({transform: 'translateX(100%)'})),
      animate('300ms ease-in-out', style({opacity: 0}))
    ])
  ]),
]);

/*
* => void   :leave,
void => *   :enter
* */
