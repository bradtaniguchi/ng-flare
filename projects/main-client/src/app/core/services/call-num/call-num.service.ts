import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../../../app-store/app-state';
import { disconnect } from '../../../app-store/disconnect/disconnect.actions';
import { Subject } from 'rxjs';

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
    // tslint:disable-next-line: no-use-before-declare
    return new CallNum(this);
  }

  /**
   * Returns the current callNumber, and updates it for the next call,
   * is global to all CallNums, and calls.
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

/**
 * A class that handles "calls" for different http calls
 */
export class CallNum extends Subject<any> {
  /**
   * List of call numbers to disconnect from when "clear" is called
   */
  private callNumbers: number[] = [];
  /**
   * If we are already "disconnected", which should only occur
   * 1 time.
   */
  private disconnected: boolean;
  constructor(private callNumService: CallNumService) {
    super();
  }

  /**
   * Returns a new callNumber, which will be unique among all calls,
   * then adds it to the call numbers for this class, so if
   * `clear` is called, then we dispatch a disconnect action for
   * the
   */
  public get(): number {
    if (this.disconnected) {
      throw new Error('Already disconnected');
    }
    const num = this.callNumService.getCallNumber();
    this.callNumbers = [...this.callNumbers, num];
    return num;
  }

  /**
   * Clears existing subscriptions, like the `takeUntil` convention, and
   * dispatches disconnect calls.
   */
  public clear() {
    this.disconnect();
    super.next();
    super.unsubscribe();
    this.disconnected = true;
  }

  /**
   * Dispatches the disconnect action for existing calls, and clears existing callNumbers
   */
  public clearPrevious() {
    this.callNumService.store.dispatch(
      disconnect({
        callNumbers: this.callNumbers
      })
    );
    this.callNumbers = [];
  }

  /**
   * Dispatches the "disconnect" actions
   */
  private disconnect() {
    this.callNumService.store.dispatch(
      disconnect({
        callNumbers: this.callNumbers
      })
    );
  }
}
