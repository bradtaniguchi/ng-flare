import { TestBed, async, inject } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthGuard } from './auth.guard';
import { AppState } from '../../app-store/app-state';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

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

    TestBed.get(Store);
  });

  it('exists', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  // it('returns true if user is authenticated', () => {
  //   store.setState({ auth: { user: {} as any } });
  // });
});
