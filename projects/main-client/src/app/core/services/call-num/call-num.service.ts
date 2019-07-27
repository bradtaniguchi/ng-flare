import { Injectable } from '@angular/core';
import { CallNum } from './call-num';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app-store/app-state';
import { Actions, ofType } from '@ngrx/effects';
import { disconnect } from '../../../app-store/disconnect/disconnect.actions';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CallNumService {
  /**
   * A counter for all call numbers, used to identify requests
   */
  private callNum = 0;
  constructor(public store: Store<AppState>, private actions: Actions) {}

  /**
   * Returns a new instance of a CallNum class, which can be used to handle
   * callNumbers to clear for a given class instance, and clean up existing
   * observables
   */
  public createCallNum() {
    return new CallNum(this);
  }

  /**
   * Returns the current callNumber, and updates it for the next call
   */
  public getCallNumber(): number {
    this.callNum++;
    return this.callNum;
  }

  /**
   * Returns a subject that is emitted only when the given call number is emitted
   * from the actions.
   */
  public takeUntil({ callNum }: { callNum: number }) {
    return this.actions.pipe(
      ofType(disconnect),
      filter(action => action.callNumbers.includes(callNum))
    );
  }
}
