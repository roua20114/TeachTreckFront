import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedClassroomsComponent } from './joined-classrooms.component';

describe('JoinedClassroomsComponent', () => {
  let component: JoinedClassroomsComponent;
  let fixture: ComponentFixture<JoinedClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedClassroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
