import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHeaderBarComponent } from './student-header-bar.component';

describe('StudentHeaderBarComponent', () => {
  let component: StudentHeaderBarComponent;
  let fixture: ComponentFixture<StudentHeaderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentHeaderBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentHeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
