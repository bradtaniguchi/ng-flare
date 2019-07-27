import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { CallNumService } from './call-num.service';
import { provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';

describe('CallNumService', () => {
  const initialState = {};
  const actions$ = new Subject();
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(actions$)
      ]
    })
  );

  it('should be created', () => {
    const service: CallNumService = TestBed.get(CallNumService);
    expect(service).toBeTruthy();
  });
});
