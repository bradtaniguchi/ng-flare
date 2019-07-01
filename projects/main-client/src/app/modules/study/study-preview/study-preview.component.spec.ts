import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from '../../../app-store/app-state';
import { StudyFacadeService } from '../store/study-facade.service';
import { StudyPreviewComponent } from './study-preview.component';

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
});
