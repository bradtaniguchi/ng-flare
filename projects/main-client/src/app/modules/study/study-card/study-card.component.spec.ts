import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCardComponent } from './study-card.component';
import { StudyStatusModule } from '../../../shared/study-status/study-status.module';
import { StudyFacadeService } from '../store/study-facade.service';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../app-store/app-state';

describe('StudyCardComponent', () => {
  let component: StudyCardComponent;
  let fixture: ComponentFixture<StudyCardComponent>;
  const initialState: Partial<AppState> = {
    study: {
      deck: 'deckId'
    },
    card: {
      loading: false,
      ids: [],
      entities: {}
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudyCardComponent],
      imports: [StudyStatusModule],
      providers: [StudyFacadeService, provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCardComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
