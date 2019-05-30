import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from './models/group';
import { DrawerFacade } from './app-store/drawer/drawer.facade';
import { Store, select } from '@ngrx/store';
import { AppState } from './app-store/app-state';
import { GroupFacadeService } from './app-store/group/group-facade.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header
      [group]="group$ | async"
      (toggleMenu)="drawer.toggle()"
    ></app-header>
    <mat-drawer-container>
      <mat-drawer #drawer [mode]="drawerMode$ | async" [opened]="true">
        sidenav
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
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public group$: Observable<Group | undefined>;
  public drawerMode$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private groupFacade: GroupFacadeService,
    private drawerFacade: DrawerFacade
  ) {}

  ngOnInit() {
    this.group$ = this.store.pipe(select(this.groupFacade.getSelected));
    this.drawerMode$ = this.store.pipe(select(this.drawerFacade.getMode));
  }

  public onToggleMenu() {
    console.log('toggle menu');
  }
}
