import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar>
      <mat-toolbar-row fxLayout="row" fxLayoutAlign="space-between">
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
          <a [routerLink]="/" class="mat-title">
            Flare
          </a>
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
  @Output() toggleMenu = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
