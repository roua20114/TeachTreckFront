import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveClassroomComponent } from './archive-classroom.component';

describe('ArchiveClassroomComponent', () => {
  let component: ArchiveClassroomComponent;
  let fixture: ComponentFixture<ArchiveClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveClassroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
