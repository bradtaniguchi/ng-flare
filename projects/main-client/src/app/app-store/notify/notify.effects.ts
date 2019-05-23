import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { Notify, NotifyActionTypes } from './notify.actions';
import { NotifyService } from '../../core/services/notify/notify.service';

@Injectable()
export class NotifyEffects {
  constructor(private action$: Actions, private notify: NotifyService) {}

  @Effect({
    dispatch: false
  })
  public notify$ = this.action$.pipe(
    ofType(NotifyActionTypes.Notify),
    mergeMap((action: Notify) => this.notify.notify(action.payload))
  );
}
