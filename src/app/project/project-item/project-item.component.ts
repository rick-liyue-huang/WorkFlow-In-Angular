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
import {cardAnim} from '../../animation/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {

  @Input() item!: Record<string, any>;
  @Output() onInvite = new EventEmitter<void>()
  @Output() onEdit = new EventEmitter<void>()
  @Output() onDelete = new EventEmitter<void>();
  @HostBinding('@card') cardState ='out';

  @HostListener('mouseenter',[/*'$event.target'*/])
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onDeleteClick() {
    this.onDelete.emit();
  }
}
