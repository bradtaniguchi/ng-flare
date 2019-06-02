import { TestBed } from '@angular/core/testing';

import { ErrorReportService } from './error-report.service';

describe('ErrorReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorReportService = TestBed.get(ErrorReportService);
    expect(service).toBeTruthy();
  });
});
