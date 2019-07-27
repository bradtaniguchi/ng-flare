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
