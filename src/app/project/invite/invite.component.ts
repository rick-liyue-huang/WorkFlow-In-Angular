import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {

  items = [
    {id: 1, name: 'rick'},
    {id: 2, name: 'leo'},
    {id: 3, name: 'aj'},
    {id: 4, name: 'claire'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onInviteMember() {

  }

  //  match with '[displayWith]="displayUser"'
  displayUser(user: {id: string; name: string}) {
    return user ? user.name : '';
  }

}
