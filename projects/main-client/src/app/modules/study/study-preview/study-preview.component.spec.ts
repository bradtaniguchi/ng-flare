import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, Subject } from 'rxjs';
import { AppState } from '../../../app-store/app-state';
import { StudyFacadeService } from '../store/study-facade.service';
import { StudyPreviewComponent } from './study-preview.component';
import { FlipCardModule } from '../../../shared/flip-card/flip-card.module';
import { DeckFacadeService } from '../../../app-store/deck/deck.facade';
import { CardFacadeService } from '../../../app-store/cards/card.facade';
import { provideMockActions } from '@ngrx/effects/testing';
import { LoadingSpinnerModule } from '../../../shared/loading-spinner/loading-spinner.module';
import { StudyService } from '../../../core/services/study/study.service';

describe('StudyPreviewComponent', () => {
  let component: StudyPreviewComponent;
  let fixture: ComponentFixture<StudyPreviewComponent>;
  const initialState: Partial<AppState> = {
    study: {}
  };
  const actions$ = new Subject();
  const deckId = 'someDeckId';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyPreviewComponent],
      imports: [
        RouterTestingModule,
        LoadingSpinnerModule,
        FlipCardModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(actions$),
        StudyService,
        StudyFacadeService,
        DeckFacadeService,
        CardFacadeService,
        // mock current route to provide the deckId
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              deckId
            })
          } as Partial<ActivatedRoute>
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPreviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows deck name');
  it('shows deck description');
  it('shows the front of all cards by default');
  it('shows the back of the card if flipped');
  it('shows the back of multiple cards when flipped');
  it('study redirects the user to the next card');
});
