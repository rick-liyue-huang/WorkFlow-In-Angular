import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {

  items = [
    {
      id: 1,
      name: 'rick'
    },
    {
      id: 2,
      name: 'leo'
    },
    {
      id: 3,
      name: 'claire'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {

  }

  displayUser(user: {id: number; name: string}) {
    return user ? user.name : ''
  }

}
