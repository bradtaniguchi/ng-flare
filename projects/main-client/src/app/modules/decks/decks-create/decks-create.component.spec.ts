import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecksCreateComponent } from './decks-create.component';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DecksCreateComponent', () => {
  let component: DecksCreateComponent;
  let fixture: ComponentFixture<DecksCreateComponent>;
  const initialState: Partial<AppState> = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecksCreateComponent],
      providers: [
        provideMockStore({
          initialState
        })
      ],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
