import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { StudyPreviewComponent } from './study-preview.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';
import { StudyFacadeService } from '../store/study-facade.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { GetStudyDeck } from '../store/study.actions';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

describe('StudyPreviewComponent', () => {
  let component: StudyPreviewComponent;
  let fixture: ComponentFixture<StudyPreviewComponent>;
  const initialState: Partial<AppState> = {
    study: {}
  };
  const deckId = 'someDeckId';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyPreviewComponent],
      imports: [
        RouterTestingModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        provideMockStore({ initialState }),
        StudyFacadeService,
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
  it('should dispatch getDeck initially', inject(
    [Store],
    (store: Store<AppState>) => {
      const spy = spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith(new GetStudyDeck({ deckId }));
    }
  ));
});
