import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app-store/app-state';
import { DashboardFacadeService } from './store/dashboard-facade.service';
import { Deck } from '../../models/deck';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';
import { GroupFacadeService } from '../../app-store/group/group-facade.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div fxLayout="column" fxLayoutGap="16px" class="margin">
      <div fxLayout="row" fxLayoutAlign="center center">
        <ng-container *ngIf="group$ | async as group">
          <mat-card fxFlex="50" class="hover-hide">
            <mat-card-title fxLayout="row" fxLayoutAlign="space-between">
              <span>{{ group.name }}</span>
              <span>
                <button
                  mat-icon-button
                  aria-label="menu"
                  type="button"
                  class="hover-hide-el"
                >
                  <mat-icon>more_vert</mat-icon>
                </button>
              </span>
            </mat-card-title>
            <p>
              {{ group.description }}
            </p>
            <mat-card-content> </mat-card-content>
            <mat-card-actions align="end">
              <span>
                <button
                  type="button"
                  mat-icon-button
                  color="primary"
                  aria-label="Edit Group"
                  title="Edit Group"
                  class="hover-hide-el"
                >
                  <mat-icon>edit</mat-icon>
                </button>
                <button
                  type="button"
                  mat-icon-button
                  color="primary"
                  aria-label="Study Group"
                  title="Study Group"
                  class="hover-hide-el"
                >
                  <mat-icon>launch</mat-icon>
                </button>
              </span>
            </mat-card-actions>
          </mat-card>
        </ng-container>
      </div>
      <ng-container *ngIf="loading$ | async">
        <app-loading-spinner> </app-loading-spinner>
      </ng-container>
      <ul>
        <ng-container *ngFor="let deck of decks$ | async">
          <li fxLayout="row" fxLayoutAlign="center center">
            <mat-card fxFlex="50">
              {{ deck | json }}
            </mat-card>
          </li>
        </ng-container>
      </ul>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public loading$: Observable<boolean>;
  public group$: Observable<Group>;
  public decks$: Observable<Deck[]>;
  constructor(
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService,
    private dashboardFacade: DashboardFacadeService
  ) {}

  ngOnInit() {
    this.group$ = this.store.pipe(select(this.groupFacade.getSelected));
    this.loading$ = this.store.pipe(select(this.dashboardFacade.getLoading));
    this.decks$ = this.store.pipe(select(this.dashboardFacade.getDecks));
    this.dashboardFacade.searchDashboardDecks({});
  }
}
