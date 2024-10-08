import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInClassroomComponent } from './student-in-classroom.component';

describe('StudentInClassroomComponent', () => {
  let component: StudentInClassroomComponent;
  let fixture: ComponentFixture<StudentInClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentInClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
