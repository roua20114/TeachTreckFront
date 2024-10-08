import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleHomeworkComponent } from './schedule-homework.component';

describe('ScheduleHomeworkComponent', () => {
  let component: ScheduleHomeworkComponent;
  let fixture: ComponentFixture<ScheduleHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleHomeworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
