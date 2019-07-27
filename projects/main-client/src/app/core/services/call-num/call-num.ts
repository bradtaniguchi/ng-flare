import { Subject } from 'rxjs';
import { CallNumService } from './call-num.service';
import { disconnect } from '../../../app-store/disconnect/disconnect.actions';

/**
 * A class that handles "calls" for different http calls
 */
export class CallNum extends Subject<any> {
  /**
   * List of call numbers to disconnect from when "clear" is called
   */
  private callNumbers: number[] = [];
  constructor(private callNumService: CallNumService) {
    super();
  }

  /**
   * Returns a new callNumber, which will be unique among all calls.
   */
  public get(): number {
    return this.callNumService.getCallNumber();
  }

  /**
   * Clears existing subscriptions, like the `takeUntil` convention, and
   * dispatches disconnect calls.
   */
  public clear() {
    this.disconnect();
    super.next();
    super.unsubscribe();
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
