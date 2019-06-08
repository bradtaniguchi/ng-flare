import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Deck } from '../../../models/deck';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { map, takeUntil } from 'rxjs/operators';
import { StudyFacadeService } from '../store/study-facade.service';
import { Card } from '../../../models/card';
import { logger } from '../../../core/logger';

@Component({
  selector: 'app-study-preview',
  template: `
    <div class="margin">
      <!-- todo add loading spinner -->
      <ng-container *ngIf="deck$ | async as deck">
        <mat-card class="hover-hide">
          <mat-card-title>
            <div>
              <mat-icon>assignment</mat-icon>
              <span>{{ deck.name }}</span>
            </div>
          </mat-card-title>
          <mat-card-content>
            <p>
              {{ deck.description }}
            </p>
          </mat-card-content>
          <mat-card-actions align="end">
            <button
              type="button"
              mat-button
              color="primary"
              class="hover-hide-el"
            >
              Study
            </button>
            <button
              type="button"
              mat-button
              color="primary"
              class="hover-hide-el"
            >
              Start
            </button>
          </mat-card-actions>
        </mat-card>
      </ng-container>
      <ng-container>
        <!-- TODO: show list of cards for the deck-->
        {{ cards$ | async }}
      </ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyPreviewComponent implements OnInit, OnDestroy {
  public deckId$: Observable<string | undefined>;
  public deck$: Observable<Deck | undefined>;
  public cards$: Observable<Card[] | undefined>;
  private takeUntil = new Subject();
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private studyFacade: StudyFacadeService
  ) {}

  ngOnInit() {
    logger.log('in study-preview');
    this.deckId$ = this.route.params.pipe(map(params => params.deckId));
    this.deck$ = this.store.pipe(select(this.studyFacade.getDeck));
    this.cards$ = this.store.pipe(select(this.studyFacade.getCards));

    this.deckId$
      .pipe(takeUntil(this.takeUntil))
      .subscribe(deckId => this.studyFacade.loadDeck(deckId));
  }

  ngOnDestroy() {
    this.takeUntil.next();
    this.takeUntil.unsubscribe();
  }
}
