import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsCreateComponent } from './groups-create.component';

describe('GroupsCreateComponent', () => {
  let component: GroupsCreateComponent;
  let fixture: ComponentFixture<GroupsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
