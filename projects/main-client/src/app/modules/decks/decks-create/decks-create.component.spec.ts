import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';
import { DeckFacadeService } from '../../../app-store/deck/deck-facade.service';
import { SearchParamsService } from '../../../core/services/search-params/search-params.service';
import { DecksCreateComponent } from './decks-create.component';

describe('DecksCreateComponent', () => {
  let component: DecksCreateComponent;
  let fixture: ComponentFixture<DecksCreateComponent>;
  const initialState: Partial<AppState> = {};

  const getNameInput = () =>
    fixture.debugElement.query(By.css('input[name="name"]'));

  const getDescriptionInput = () =>
    fixture.debugElement.query(By.css('textarea[name="description"]'));

  const getSubmit = () =>
    fixture.debugElement.query(By.css('button[type="submit"]'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecksCreateComponent],
      providers: [
        provideMockStore({
          initialState
        }),
        DeckFacadeService,
        SearchParamsService
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
    const input = getNameInput().nativeElement;
    input.value = 'some value';
    input.dispatchEvent(new Event('input'));

    const form = component.form;
    expect(form.valid).toEqual(true);
  });
  // not finished yet
  it('form show required if create is clicked', async () => {
    await fixture.whenStable();
    const submit = getSubmit().nativeElement;
    submit.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('mat-error'));
    // console.log('test with form and error', { form, error });
    expect(error).toBeDefined();
    expect(error.nativeElement.textContent).toContain('Field is Required');
  });
  it('form is invalid if user just fills out description', async () => {
    await fixture.whenStable();
    const description = getDescriptionInput().nativeElement;
    description.value = 'some value';
    description.dispatchEvent(new Event('input'));

    const form = component.form;
    expect(form.valid).toEqual(false);
  });
  it('form is invalid if name is too long', async () => {
    await fixture.whenStable();
    const input = getNameInput().nativeElement;
    input.value = 'o'.repeat(33);
    input.dispatchEvent(new Event('input'));

    const form = component.form;
    fixture.detectChanges();
    await fixture.whenStable();
    console.log(form);
    expect(form.valid).toEqual(false);
  });
  it('dispatches action to create deck with name, description', inject(
    [DeckFacadeService],
    async (deckFacade: DeckFacadeService) => {
      const spy = spyOn(deckFacade, 'createDeck');
      await fixture.whenStable();

      const nameInput = getNameInput().nativeElement;
      nameInput.value = 'Deck Name';
      nameInput.dispatchEvent(new Event('input'));

      const descriptionInput = getDescriptionInput().nativeElement;
      (descriptionInput.value = 'Deck description'),
        descriptionInput.dispatchEvent(new Event('input'));

      const submit = getSubmit().nativeElement;
      submit.dispatchEvent(new MouseEvent('click'));

      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith({
        name: 'Deck Name',
        description: 'Deck description'
      });
    }
  ));
  it('does not dispatch action to create deck if no name', inject(
    [DeckFacadeService],
    async (deckFacade: DeckFacadeService) => {
      const spy = spyOn(deckFacade, 'createDeck');
      await fixture.whenStable();

      const descriptionInput = getDescriptionInput().nativeElement;
      descriptionInput.value = 'Deck description';
      descriptionInput.dispatchEvent(new Event('input'));

      const submit = getSubmit().nativeElement;
      submit.dispatchEvent(new MouseEvent('click'));

      fixture.detectChanges();
      expect(spy).not.toHaveBeenCalled();
    }
  ));
});
