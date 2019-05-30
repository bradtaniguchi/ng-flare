import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app-store/app-state';
import { DashboardFacadeService } from './store/dashboard-facade.service';
import { Deck } from '../../models/deck';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <mat-card>
        TOOLBAR STUFF GOES HERE
      </mat-card>
      <ng-container *ngIf="loading$ | async">
        SPINNER
      </ng-container>
      <ng-container *ngFor="let deck of decks$ | async">
        <mat-card>
          {{ deck | json }}
        </mat-card>
      </ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public loading$: Observable<boolean>;
  public decks$: Observable<Deck[]>;
  constructor(
    private store: Store<AppState>,
    private dashboardFacade: DashboardFacadeService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(this.dashboardFacade.getLoading));
    this.decks$ = this.store.pipe(select(this.dashboardFacade.getDecks));
  }
}
