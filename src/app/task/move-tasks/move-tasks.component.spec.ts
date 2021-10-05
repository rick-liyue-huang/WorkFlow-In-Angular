import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveTasksComponent } from './move-tasks.component';

describe('MoveTasksComponent', () => {
  let component: MoveTasksComponent;
  let fixture: ComponentFixture<MoveTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
