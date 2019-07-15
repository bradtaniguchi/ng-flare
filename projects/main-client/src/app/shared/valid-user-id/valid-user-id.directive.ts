import { ChangeDetectorRef, Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../models/user';

@Directive({
  selector: '[appValidUserId]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidUserIdDirective,
      multi: true
    }
  ],
  exportAs: 'appValidUserId'
})
export class ValidUserIdDirective implements AsyncValidator {
  /**
   * The current user loaded
   */
  public user$ = new ReplaySubject<User>(1);
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  public validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return control.valueChanges.pipe(
      debounceTime(250),
      filter(_ => !!_),
      distinctUntilChanged(),
      switchMap(value => this.userService.get(value)),
      tap(user => {
        if (user) {
          this.user$.next(user);
        }
      }),
      map(user => (!!user ? null : { uid: true })),
      tap(() => this.cdr.markForCheck()),
      take(1)
    );
  }
}
