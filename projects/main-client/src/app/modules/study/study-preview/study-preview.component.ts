import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Deck } from '../../../models/deck';
import { Observable, Subject, combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { map, takeUntil, tap, switchMap, filter, take } from 'rxjs/operators';
import { StudyFacadeService } from '../store/study-facade.service';
import { Card } from '../../../models/card';
import { logger } from '../../../core/logger';
import { DeckFacadeService } from '../../../app-store/deck/deck.facade';
import {
  CallNumService,
  CallNum
} from '../../../core/services/call-num/call-num.service';
import { CardFacadeService } from '../../../app-store/cards/card.facade';
import { LIMIT } from '../../../constants/limit';
import { StudyService } from '../../../core/services/study/study.service';
import { Notify } from '../../../app-store/notify/notify.actions';

@Component({
  selector: 'app-study-preview',
  template: `
    <div class="margin">
      <!-- todo add loading spinner -->
      <ng-container *ngIf="deck$ | async as deck">
        <mat-card>
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
            <!--<button
              type="button"
              mat-button
              color="primary"
              class="hover-hide-el"
            >
              Study
            </button> -->
            <a type="button" mat-button color="primary" (click)="start()">
              Start
            </a>
          </mat-card-actions>
        </mat-card>
      </ng-container>
      <!-- TODO: show graphs of generally how people do for this deck -->
      <ng-container *ngIf="cards$ | async as cards; else showLoading">
        <ng-container *ngIf="!cards.length">
          NO CARDS
          <!-- TODO: ADD NO CARDS DISPLAY -->
        </ng-container>
        <ul fxLayout="column" fxLayoutGap="8px" style="margin: 8px 0">
          <li *ngFor="let card of cards">
            <div fxLayout="row" fxLayoutAlign="start center">
              <div fxFlex>
                <!-- TODO: show list of cards for the deck-->
                <app-flip-card #flipCard [card]="card"></app-flip-card>
              </div>
              <div>
                <button (click)="flipCard.toggle()" mat-button>
                  FLIP
                </button>
              </div>
            </div>
          </li>
        </ul>
      </ng-container>
      <ng-template #showLoading>
        <app-loading-spinner> </app-loading-spinner>
      </ng-template>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyPreviewComponent implements OnInit, OnDestroy {
  public deck$: Observable<Deck | undefined>;
  public cards$: Observable<Card[] | undefined>;
  private callNum: CallNum;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private callNumService: CallNumService,
    private studyService: StudyService,
    private studyFacade: StudyFacadeService,
    private deckFacade: DeckFacadeService,
    private cardFacade: CardFacadeService
  ) {}

  ngOnInit() {
    logger.log('in study-preview');
    this.callNum = this.callNumService.createCallNum();

    this.deck$ = this.observeDecks();
    this.cards$ = this.observeCards();

    this.route.params.pipe(map(params => params.deckId)).subscribe(deckId => {
      this.studyFacade.selectStudyDeck(deckId);
      this.deckFacade.getDeck({ key: deckId, callNum: this.callNum.get() });
      this.cardFacade.listCards({
        filters: [
          {
            op: '==',
            prop: 'deck',
            value: deckId
          }
        ],
        orderBy: 'uid',
        limit: LIMIT,
        callNum: this.callNum.get()
      });
    });
  }

  ngOnDestroy() {
    this.callNum.clear();
  }

  private observeDecks() {
    return this.store.pipe(select(this.studyFacade.getDeckSelector));
  }

  private observeCards() {
    return this.store.pipe(select(this.studyFacade.getCards));
  }

  /**
   * Starts the study session by redirect the user to the first card, randomly selected.
   */
  public start() {
    this.store
      .pipe(
        select(this.studyFacade.getNext),
        map(card => card && card.uid),
        take(1)
      )
      .subscribe(cardId =>
        cardId
          ? this.router.navigate(['../../', 'cards', cardId], {
              relativeTo: this.route
            })
          : this.store.dispatch(
              new Notify({
                message: 'No Card found'
              })
            )
      );
  }
}
