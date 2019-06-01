import { TestBed, async, inject } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthGuard } from './auth.guard';
import { AppState } from '../../app-store/app-state';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  const initialState: Partial<AppState> = {
    auth: {
      user: {} as any
    }
  };
  let store: MockStore<Partial<AppState>>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, provideMockStore({ initialState })],
      imports: [RouterTestingModule]
    });

    store = TestBed.get(Store);
  });

  it('exists', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('returns true if user is authenticated', inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      store.setState({ auth: { user: {} as any } });
      const expected = cold('(a|)', { a: true });
      expect(guard.canActivate()).toBeObservable(expected);
    }
  ));
  it('returns login urlTree if user is not authenticated', inject(
    [AuthGuard, Router],
    (guard: AuthGuard, router: Router) => {
      store.setState({ auth: { user: undefined as any } });
      const expectedRoute = router.parseUrl('/login');
      const expected = cold('(a|)', { a: expectedRoute });
      expect(guard.canActivate()).toBeObservable(expected);
    }
  ));
});
