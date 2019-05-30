import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app-store/app-state';
import { DashboardFacadeService } from './store/dashboard-facade.service';
import { Deck } from '../../models/deck';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <div fxLayout="column" fxLayoutGap="16px">
      <div fxLayout="row" fxLayoutAlign="center center">
        <mat-card fxFlex="50">
          <mat-card-content> </mat-card-content>
          <mat-card-actions>
            <button type="button" mat-button color="primary">
              Edit Group
            </button>
            <button type="button" mat-button color="primary">
              Edit Group
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
      <ng-container *ngIf="loading$ | async">
        <app-loading-spinner> </app-loading-spinner>
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
    this.dashboardFacade.searchDashboardDecks({});
  }
}
