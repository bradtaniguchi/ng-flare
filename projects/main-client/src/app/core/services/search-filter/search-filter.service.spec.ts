import { TestBed } from '@angular/core/testing';

import { SearchFilterService } from './search-filter.service';

describe('SearchFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchFilterService = TestBed.get(SearchFilterService);
    expect(service).toBeTruthy();
  });
});
