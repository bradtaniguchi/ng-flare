import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { StudyFacadeService } from '../store/study-facade.service';
import { Card } from '../../../models/card';
import { Observable } from 'rxjs';
import { Duration } from 'luxon';

@Component({
  selector: 'app-study-card',
  template: `
    <div class="margin">
      <app-study-status
        [duration]="duration$ | async"
        [cards]="cards$ | async"
        [wrong]="wrong$ | async"
        [correct]="correct$ | async"
        [skipped]="skipped$ | async"
      >
      </app-study-status>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardComponent implements OnInit {
  public cards$: Observable<Card[] | undefined>;
  public card$: Observable<Card | undefined>;

  // timing
  public duration$: Observable<Duration>;
  // missed
  public correct$: Observable<Card[] | undefined>;
  public skipped$: Observable<Card[] | undefined>;
  public wrong$: Observable<Card[] | undefined>;
  constructor(
    private store: Store<AppState>,
    private studyFacade: StudyFacadeService
  ) {}

  ngOnInit() {
    this.cards$ = this.observeCards();
    this.card$ = this.observeCard();

    this.duration$ = this.observeDuration();

    this.correct$ = this.observeCorrect();
    this.skipped$ = this.observeSkipped();
    this.wrong$ = this.observeWrong();
  }

  private observeCards() {
    return this.store.pipe(select(this.studyFacade.getCards));
  }

  private observeDuration() {
    return this.store.pipe(select(this.studyFacade.getDuration));
  }

  private observeCard() {
    return this.store.pipe(select(this.studyFacade.getCard));
  }

  private observeCorrect() {
    return this.store.pipe(select(this.studyFacade.getCorrect));
  }

  private observeSkipped() {
    return this.store.pipe(select(this.studyFacade.getSkipped));
  }

  private observeWrong() {
    return this.store.pipe(select(this.studyFacade.getWrong));
  }
}
