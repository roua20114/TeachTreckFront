import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListStudntComponent } from './people-list-studnt.component';

describe('PeopleListStudntComponent', () => {
  let component: PeopleListStudntComponent;
  let fixture: ComponentFixture<PeopleListStudntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleListStudntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleListStudntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
