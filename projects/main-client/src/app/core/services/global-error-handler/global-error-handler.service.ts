import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { logger } from '../../logger';
import { ErrorFacadeService } from '../../../app-store/error/error.facade';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  public handleError(err: Error | any) {
    const errorFacadeService = this.injector.get(ErrorFacadeService);
    logger.error(err);
    errorFacadeService.report({
      err,
      message: 'Oops, There was an unexpected error'
    });
  }
}
