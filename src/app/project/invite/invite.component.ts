import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {UserModal} from '../../domain';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {

  /*items = [
    {id: 1, name: 'rick'},
    {id: 2, name: 'leo'},
    {id: 3, name: 'aj'},
    {id: 4, name: 'claire'}
  ];*/

  members: UserModal[] =[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InviteComponent>
  ) { }

  ngOnInit(): void {
    this.members = [...this.data.members]
  }

  onSubmit(ev: Event, {value, valid}: {value: any, valid: any}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }

  //  match with '[displayWith]="displayUser"'
  /*displayUser(user: {id: string; name: string}) {
    return user ? user.name : '';
  }*/

}
