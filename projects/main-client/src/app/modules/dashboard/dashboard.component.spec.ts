import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingSpinnerModule } from '../../shared/loading-spinner/loading-spinner.module';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../app-store/app-state';
import { GroupFacadeService } from '../../app-store/group/group.facade';
import { SearchParamsService } from '../../core/services/search-params/search-params.service';
import { DeckOverviewModule } from '../../shared/deck-overview/deck-overview.module';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const initialState: Partial<AppState> = {
    group: {} as any
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        provideMockStore({ initialState }),
        GroupFacadeService,
        SearchParamsService
      ],
      imports: [
        // display module
        LoadingSpinnerModule,
        DeckOverviewModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
