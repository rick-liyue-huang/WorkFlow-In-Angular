import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditTaskListComponent } from './new-edit-task-list.component';

describe('NewEditTaskListComponent', () => {
  let component: NewEditTaskListComponent;
  let fixture: ComponentFixture<NewEditTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
