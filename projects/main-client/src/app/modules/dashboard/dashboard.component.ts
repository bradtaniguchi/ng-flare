import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app-store/app-state';
import { Deck } from '../../models/deck';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';
import { GroupFacadeService } from '../../app-store/group/group.facade';

@Component({
  selector: 'app-dashboard',
  template: `
    <div fxLayout="column" fxLayoutGap="16px" class="margin">
      <div fxLayout="row" fxLayoutAlign="center center">
        <ng-container *ngIf="group$ | async as group">
          <mat-card fxFlex="50" class="hover-hide">
            <mat-card-title fxLayout="row" fxLayoutAlign="space-between">
              <div fxLayout="row" fxLayoutAlign="start center">
                <mat-icon>group</mat-icon>
                <span>{{ group.name }}</span>
              </div>
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
            <mat-card-content>
              <p>
                {{ group.description }}
              </p>
            </mat-card-content>
            <mat-card-actions align="end">
              <span>
                <a
                  type="button"
                  mat-button
                  color="primary"
                  routerLink="/decks/create"
                  class="hover-hide-el"
                >
                  Create Deck
                </a>
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
      <ul fxLayout="column" fxLayoutGap="4px">
        <ng-container *ngFor="let deck of decks$ | async">
          <li fxLayout="row" fxLayoutAlign="center center">
            <app-deck-overview [deck]="deck" [canEdit]="false" fxFlex="50">
            </app-deck-overview>
          </li>
        </ng-container>
      </ul>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public group$: Observable<Group>;
  public decks$: Observable<Deck[]>;
  constructor(
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
