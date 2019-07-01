import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';
import { DeckFacadeService } from '../../../app-store/deck/deck.facade';
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

  const getCardFront = () =>
    fixture.debugElement.query(By.css('textarea[name="front"]'));

  const getCardBack = () =>
    fixture.debugElement.query(By.css('textarea[name="back"]'));

  const getAddCard = () =>
    fixture.debugElement.query(By.css('button[mat-button]'));
  const getRemoveCards = () =>
    fixture.debugElement.queryAll(By.css('button[mat-icon-button]'));

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
        RouterTestingModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatCardModule
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
  it('form should start with 1 empty card', async () => {
    await fixture.whenStable();
    const cards = component.cards;
    expect(cards[0]).toEqual({});
  });
  it('card front+back is saved to form', async () => {
    await fixture.whenStable();

    const cardFrontInput = getCardFront().nativeElement;
    cardFrontInput.value = 'Card Front';
    cardFrontInput.dispatchEvent(new Event('input'));

    const cardBackInput = getCardBack().nativeElement;
    cardBackInput.value = 'Card Back';
    cardBackInput.dispatchEvent(new Event('input'));

    const form = component.form;
    expect(form.value.cards[0].front).toEqual('Card Front');
    expect(form.value.cards[0].back).toEqual('Card Back');
  });
  it('clicking add card, adds a card', async () => {
    await fixture.whenStable();
    const addCard = getAddCard().nativeElement;
    console.log('look a button', addCard);
    addCard.dispatchEvent(new MouseEvent('click'));

    fixture.detectChanges();
    expect(component.cards).toEqual([{}, {}]);
  });
  it('clicking remove card, removes the card', async () => {
    await fixture.whenStable();
    component.cards = [
      {
        front: 'one'
      },
      {
        front: 'two'
      },
      {
        front: 'three'
      }
    ];
    fixture.detectChanges();
    const removeCard = getRemoveCards()[1].nativeElement;
    removeCard.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.cards).toEqual([
      {
        front: 'one'
      },
      {
        front: 'three'
      }
    ]);
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
  it('dispatches action to create deck with name, description, and card', inject(
    [DeckFacadeService],
    async (deckFacade: DeckFacadeService) => {
      const spy = spyOn(deckFacade, 'createDeckWithCards');
      await fixture.whenStable();

      const nameInput = getNameInput().nativeElement;
      nameInput.value = 'Deck Name';
      nameInput.dispatchEvent(new Event('input'));

      const descriptionInput = getDescriptionInput().nativeElement;
      (descriptionInput.value = 'Deck description'),
        descriptionInput.dispatchEvent(new Event('input'));

      const cardFrontInput = getCardFront().nativeElement;
      cardFrontInput.value = 'Card Front';
      cardFrontInput.dispatchEvent(new Event('input'));

      const cardBackInput = getCardBack().nativeElement;
      cardBackInput.value = 'Card Back';
      cardBackInput.dispatchEvent(new Event('input'));

      const submit = getSubmit().nativeElement;
      submit.dispatchEvent(new MouseEvent('click'));

      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith({
        deck: {
          name: 'Deck Name',
          description: 'Deck description'
        },
        cards: [
          {
            front: 'Card Front',
            back: 'Card Back'
          }
        ]
      });
    }
  ));
  it('does not dispatch action to create deck if no name', inject(
    [DeckFacadeService],
    async (deckFacade: DeckFacadeService) => {
      const spy = spyOn(deckFacade, 'createDeckWithCards');
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
