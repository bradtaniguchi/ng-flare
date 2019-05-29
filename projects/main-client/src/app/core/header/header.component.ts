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
            aria-label="Menu"
            mat-icon-button
            (click)="toggleMenu.emit()"
          >
            <mat-icon>
              menu
            </mat-icon>
          </button>
          <a routerLink="/" class="mat-title">
            Flare
          </a>
          <ng-container *ngIf="group">
            <a class="mat-title" fxHide.xs>
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
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() group: Group;
  @Output() toggleMenu = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
