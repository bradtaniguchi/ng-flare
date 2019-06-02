import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Group } from '../../models/group';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <mat-toolbar-row fxLayout="row" fxLayoutAlign="space-between center">
        <span>
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
          <a routerLink="/" class="mat-title" aria-label="Go to the main page">
            Flare
          </a>
          <ng-container *ngIf="group">
            <a class="mat-title" fxHide.xs aria-label="Go to group info page">
              {{ group.name }}
            </a>
          </ng-container>
        </span>
        <span>
          <!-- USER ICON GOES HERE-->
          <ng-container> </ng-container>
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
  @Output() toggleMenu = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
