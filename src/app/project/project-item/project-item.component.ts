import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  // TODO: set the item type to match with projects in project-list
  @Input() item: any;
  @Output() invite = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  openInviteMemberDialog() {
    this.invite.emit();
  }

}
