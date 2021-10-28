import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {cardAnim} from '../../animations/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectItemComponent implements OnInit {

  // TODO: set the item type to match with projects in project-list
  @Input() item: any;
  @Output() invite = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  @Output() onSelected = new EventEmitter<void>()

  // can be acted as [@card]='cardState in parent template
  @HostBinding('@card') cardState = 'out';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover'
  }

  @HostListener('mouseleave')
  onMoueLeave() {
    this.cardState = 'out';
  }

  constructor() { }

  ngOnInit(): void {
  }

  openInviteMemberDialog(ev: Event) {
    ev.stopPropagation();
    this.invite.emit();
  }

  onEditClick(ev: Event) {
    ev.stopPropagation();
    this.edit.emit();
  }

  onDeleteClick(ev: Event) {
    ev.stopPropagation();
    this.delete.emit();
  }

  onCardClick() {
    this.onSelected.emit();
  }

}
