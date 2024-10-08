import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedClassListComponent } from './joined-class-list.component';

describe('JoinedClassListComponent', () => {
  let component: JoinedClassListComponent;
  let fixture: ComponentFixture<JoinedClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedClassListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
