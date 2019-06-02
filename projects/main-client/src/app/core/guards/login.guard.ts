import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState } from '../../app-store/app-state';
import { AuthFacadeService } from '../../app-store/auth/auth-facade.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private authFacade: AuthFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(this.authFacade.getUserState),
      map(user => (user ? this.router.parseUrl('/') : true)),
      take(1)
    );
  }
}
