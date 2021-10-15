import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  // TODO: set the item type to match with projects in project-list
  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

}