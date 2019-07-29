import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DweDeckActionsComponent } from './dwe-deck-actions.component';

describe('DweDeckActionsComponent', () => {
  let component: DweDeckActionsComponent;
  let fixture: ComponentFixture<DweDeckActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DweDeckActionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DweDeckActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
