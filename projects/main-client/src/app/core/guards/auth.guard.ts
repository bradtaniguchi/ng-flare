import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppState } from '../../app-store/app-state';
import { AuthFacadeService } from '../../app-store/auth/auth-facade.service';
import { logger } from '../logger';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private authFacade: AuthFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(this.authFacade.getUserState),
      map(user => (user ? true : this.router.parseUrl('/login'))),
      tap(val => logger.log('auth guard return', val)),
      take(1)
    );
  }
}
