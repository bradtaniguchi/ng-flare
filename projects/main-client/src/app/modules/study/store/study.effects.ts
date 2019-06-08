import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';
import { logger } from '../../../core/logger';
import { DeckService } from '../../../core/services/deck/deck.service';
import {
  GetStudyDeck,
  GetStudyDeckFailed,
  GetStudyDeckSuccess,
  SetStudyDeck,
  StudyActionTypes
} from './study.actions';

@Injectable({
  providedIn: 'root'
})
export class StudyEffects {
  constructor(private actions$: Actions, private deckService: DeckService) {}

  @Effect()
  getStudyDeck$ = this.actions$.pipe(
    ofType(StudyActionTypes.GET_DECK),
    mergeMap((action: GetStudyDeck) =>
      this.deckService.get({ ...action.payload, takeOne: true }).pipe(
        mergeMap(deck => [
          new GetStudyDeckSuccess({ deck }),
          new SetStudyDeck({ deck })
        ]),
        catchError(err => {
          logger.error(err);
          return of(new GetStudyDeckFailed());
        })
      )
    )
  );
}
