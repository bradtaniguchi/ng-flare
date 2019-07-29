import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwrDeckActionsComponent } from './dwr-deck-actions.component';

describe('DwrDeckActionsComponent', () => {
  let component: DwrDeckActionsComponent;
  let fixture: ComponentFixture<DwrDeckActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DwrDeckActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwrDeckActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
