import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from './models/group';
import { DrawerFacade } from './app-store/drawer/drawer.facade';
import { Store, select } from '@ngrx/store';
import { AppState } from './app-store/app-state';
import { GroupFacadeService } from './app-store/group/group-facade.service';
import { LoadingFacadeService } from './app-store/loading/loading.facade.service';
import { User } from './models/user';
import { AuthFacadeService } from './app-store/auth/auth-facade.service';
import { logger } from './core/logger';

@Component({
  selector: 'app-root',
  template: `
    <app-header
      [group]="group$ | async"
      [loading]="loading$ | async"
      [user]="user$ | async"
      (toggleMenu)="drawer.toggle()"
    ></app-header>
    <mat-drawer-container>
      <mat-drawer
        #drawer
        [mode]="drawerMode$ | async"
        [opened]="drawerOpened$ | async"
      >
        <app-side-nav (logout)="logout()" (report)="report()"> </app-side-nav>
      </mat-drawer>
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `
      mat-drawer-container {
        height: calc(100% - 64px);
      }
    `,
    `
      mat-drawer {
        width: 256px;
        background: inherit;
        border-right: none;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public group$: Observable<Group | undefined>;
  public user$: Observable<User | undefined>;
  public loading$: Observable<boolean>;
  public drawerMode$: Observable<any>;
  public drawerOpened$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private authFacade: AuthFacadeService,
    private groupFacade: GroupFacadeService,
    private drawerFacade: DrawerFacade,
    private loadingFacade: LoadingFacadeService
  ) {}

  ngOnInit() {
    this.group$ = this.store.pipe(select(this.groupFacade.getSelected));
    this.user$ = this.store.pipe(select(this.authFacade.getUserState));
    this.loading$ = this.store.pipe(select(this.loadingFacade.getLoading));
    this.drawerMode$ = this.store.pipe(select(this.drawerFacade.getMode));
    this.drawerOpened$ = this.store.pipe(select(this.drawerFacade.getOpened));
  }

  public onToggleMenu() {
    this.drawerFacade.toggleDrawer();
  }

  public logout() {
    this.authFacade.logout();
  }

  public report() {
    // this.authFacade.
    logger.log('report called');
  }
}
