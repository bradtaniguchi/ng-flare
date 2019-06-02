import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AppState } from '../../app-store/app-state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginGuard', () => {
  const initialState: Partial<AppState> = {
    auth: {
      user: undefined
    }
  };
  let store: MockStore<Partial<AppState>>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard, provideMockStore({ initialState })],
      imports: [RouterTestingModule]
    });
    store = TestBed.get(Store);
  });

  it('should exist', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('returns true if user is not authenticated', inject(
    [LoginGuard],
    (guard: LoginGuard) => {
      store.setState({ auth: { user: undefined } });
      const expected = cold('(a|)', { a: true });
      expect(guard.canActivate()).toBeObservable(expected);
    }
  ));
  it('returns root login tree if user is already authenticated', inject(
    [LoginGuard, Router],
    (guard: LoginGuard, router: Router) => {
      store.setState({ auth: { user: {} as any } });
      const expectedRoute = router.parseUrl('/');
      const expected = cold('(a|)', { a: expectedRoute });
      expect(guard.canActivate()).toBeObservable(expected);
    }
  ));
});
