import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecksCreateComponent } from './decks-create.component';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { FormsModule, NgForm } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('DecksCreateComponent', () => {
  let component: DecksCreateComponent;
  let fixture: ComponentFixture<DecksCreateComponent>;
  const initialState: Partial<AppState> = {};

  const getInput = () =>
    fixture.debugElement.query(By.css('input[name="name"]'));

  const getDescription = () =>
    fixture.debugElement.query(By.css('textarea[name="description"]'));

  const getSubmit = () =>
    fixture.debugElement.query(By.css('button[type="submit"]'));

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

  it('form should be invalid initially', async () => {
    await fixture.whenStable();
    const form = component.form;
    expect(form.valid).toEqual(false);
  });
  it('form is valid after filling just name', async () => {
    await fixture.whenStable();
    const input = getInput().nativeElement;
    input.value = 'some value';
    input.dispatchEvent(new Event('input'));

    const form = component.form;
    expect(form.valid).toEqual(true);
  });
  // not finished yet
  xit('form show required if create is clicked', async () => {
    await fixture.whenStable();
    const submit = getSubmit().nativeElement;
    submit.dispatchEvent(new MouseEvent('click'));

    const form = component.form;
    console.log('test with form', form);
    // TODO
  });
  it('form is invalid if user just fills out description', async () => {
    await fixture.whenStable();
    const description = getDescription().nativeElement;
    description.value = 'some value';
    description.dispatchEvent(new Event('input'));

    const form = component.form;
    expect(form.valid).toEqual(false);
  });
  it('form is invalid if name is too long', async () => {
    await fixture.whenStable();
    const input = getInput().nativeElement;
    input.value = 'o'.repeat(33);
    input.dispatchEvent(new Event('input'));

    const form = component.form;
    fixture.detectChanges();
    await fixture.whenStable();
    console.log(form);
    expect(form.valid).toEqual(false);
  });
});
