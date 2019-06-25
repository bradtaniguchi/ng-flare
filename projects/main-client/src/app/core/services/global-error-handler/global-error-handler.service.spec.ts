import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';
import { AppState } from '../../../app-store/app-state';
import { provideMockStore } from '@ngrx/store/testing';
import { ErrorFacadeService } from '../../../app-store/error/error.facade';

describe('GlobalErrorHandlerService', () => {
  const initialState: Partial<AppState> = {
    auth: {
      user: undefined
    }
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ErrorFacadeService, provideMockStore({ initialState })]
    })
  );

  it('should be created', () => {
    const service: GlobalErrorHandlerService = TestBed.get(
      GlobalErrorHandlerService
    );
    expect(service).toBeTruthy();
  });
});
