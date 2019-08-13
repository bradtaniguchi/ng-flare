import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipCardComponent } from './flip-card.component';
import { MatCardModule } from '@angular/material/card';

describe('FlipCardComponent', () => {
  let component: FlipCardComponent;
  let fixture: ComponentFixture<FlipCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlipCardComponent],
      imports: [MatCardModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows front by default');
  it('shows back');
  it('shows back when toggle is called');
});
