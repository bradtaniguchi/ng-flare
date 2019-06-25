import { Injectable, ErrorHandler } from '@angular/core';
import { logger } from '../../logger';
import { ErrorFacadeService } from '../../../app-store/error/error.facade';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private errorFacadeService: ErrorFacadeService) {}

  public handleError(err: Error | any) {
    logger.error(err);
    this.errorFacadeService.report({
      err,
      message: 'Oops, There was an unexpected error'
    });
  }
}
