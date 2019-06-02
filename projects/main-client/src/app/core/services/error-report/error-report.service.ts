import { Injectable } from '@angular/core';
import { logger } from '../../logger';

@Injectable({
  providedIn: 'root'
})
export class ErrorReportService {
  constructor() {}

  public report(params: any) {
    logger.error(params);
    // TODO: call cloud function to report error
  }
}
