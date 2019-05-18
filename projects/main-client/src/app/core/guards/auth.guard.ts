import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store/app-state';
import { Store, select } from '@ngrx/store';
import { AuthFacadeService } from '../../app-store/auth/auth-facade.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private authFacade: AuthFacadeService,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(this.authFacade.getUserState),
      map(user => (user ? true : this.router.parseUrl('/login'))),
      take(1)
    );
  }
}
