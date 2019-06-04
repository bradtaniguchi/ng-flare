import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Group } from '../../models/group';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <mat-toolbar-row fxLayout="row" fxLayoutAlign="space-between center">
        <span fxLayout="row" fxLayoutAlign="start center">
          <button
            type="button"
            aria-label="Toggle Menu"
            mat-icon-button
            (click)="toggleMenu.emit()"
          >
            <mat-icon>
              menu
            </mat-icon>
          </button>
          <a
            routerLink="/"
            class="mat-title no-margin"
            aria-label="Go to the main page"
          >
            Flare
          </a>
          <ng-container *ngIf="group">
            <a
              class="mat-title no-margin"
              fxHide.xs
              aria-label="Go to group info page"
            >
              {{ group.name }}
            </a>
          </ng-container>
        </span>
        <span fxLayout="row" fxLayoutAlign="start center">
          <!-- USER ICON GOES HERE-->
          <ng-container *ngIf="user">
            <a
              routerLink="/user"
              aria-label="Go To Profile"
              fxLayout="column"
              fxLayoutAlign="center center"
            >
              <app-user-icon [user]="user"> </app-user-icon>
            </a>
          </ng-container>
        </span>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-progress-bar
      mode="indeterminate"
      *ngIf="loading"
      color="primary"
    ></mat-progress-bar>
  `,
  styles: [
    `
      mat-progress-bar {
        position: absolute;
        z-index: 2;
        top: 60px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() group: Group;
  @Input() loading: boolean;
  @Input() user?: User;
  @Output() toggleMenu = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
