import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';
import { DeckFacadeService } from '../../../app-store/deck/deck.facade';
import { GroupFacadeService } from '../../../app-store/group/group.facade';
import { Deck } from '../../../models/deck';
import { DeckOverviewComponent } from '../../../shared/deck-overview/deck-overview.component';
import { DeckOverviewModule } from '../../../shared/deck-overview/deck-overview.module';
import { LoadingSpinnerModule } from '../../../shared/loading-spinner/loading-spinner.module';
import { StudyDeckListComponent } from './study-deck-list.component';

describe('StudyDeckListComponent', () => {
  let component: StudyDeckListComponent;
  let fixture: ComponentFixture<StudyDeckListComponent>;
  const deck1: Partial<Deck> = {
    uid: 'deck1',
    name: 'First Deck',
    group: 'groupId'
  };
  const deck2: Partial<Deck> = {
    uid: 'deck2',
    name: 'Second Deck',
    group: 'groupId'
  };
  const deck3: Partial<Deck> = {
    uid: 'deck3',
    name: 'Third Group',
    group: 'otherId'
  };
  const initialState: Partial<AppState> = {
    group: {
      loading: false,
      entities: {
        groupId: {
          uid: 'groupId',
          name: 'Group',
          group: 'group'
        }
      } as any,
      ids: ['group'],
      selected: 'groupId'
    },
    deck: {
      loading: false,
      entities: {
        deck1,
        deck2,
        deck3
      } as any,
      ids: ['deck1', 'deck2', 'deck3']
    }
  };

  const getDecks = () =>
    fixture.debugElement.queryAll(By.directive(DeckOverviewComponent));
  const getDeck = (index: number) => getDecks()[index];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyDeckListComponent],
      imports: [
        RouterTestingModule,
        FlexLayoutModule,
        DeckOverviewModule,
        LoadingSpinnerModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      providers: [
        provideMockStore({
          initialState
        }),
        GroupFacadeService,
        DeckFacadeService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shows decks for current group', async () => {
    const decks = getDecks();
    expect(decks.length).toEqual(2);
  });
  it('can change group');
  it('can study a deck');
});
