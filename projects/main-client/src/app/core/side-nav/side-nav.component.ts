import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  template: `
    <div fxLayout="column" fxLayoutAlign="space-between" class="full-height">
      <nav>
        <ul>
          <li>
            <a
              class="nav-element"
              fxLayout="row"
              fxLayoutAlign="start center"
              routerLink="/"
              matRipple
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <mat-icon class="large">
                view_compact
              </mat-icon>
              <div class="subheading-2 margin">
                Dashboard
              </div>
            </a>
            <a
              class="nav-element"
              matRipple
              fxLayoutAlign="start center"
              fxLayout="row"
              routerLink="study"
              routerLinkActive="active-link"
            >
              <mat-icon class="large">
                library_books
              </mat-icon>
              <div class="subheading-2 margin">
                Study
              </div>
            </a>
          </li>
          <li>
            <a
              class="nav-element"
              matRipple
              fxLayoutAlign="start center"
              fxLayout="row"
              routerLink="groups"
              routerLinkActive="active-link"
            >
              <mat-icon class="large">
                group
              </mat-icon>
              <div class="subheading-2 margin">
                Groups
              </div>
            </a>
          </li>
        </ul>
        <mat-divider> </mat-divider>
        <ul>
          <li>
            <a
              class="nav-element"
              matRipple
              fxLayoutAlign="start center"
              fxLayout="row"
              routerLink="info"
              routerLinkActive="active-link"
            >
              <mat-icon class="large">
                settings
              </mat-icon>
              <div class="subheading-2 margin">
                Info
              </div>
            </a>
          </li>
        </ul>
      </nav>
      <div fxLayout="column" class="side-nav-actions">
        <a
          mat-button
          fxLayoutAlign="start center"
          fxLayout="row"
          fxFlex
          style="padding-left: 24px;"
          routerLink="settings"
        >
          <mat-icon>
            settings
          </mat-icon>
          <span class="margin">
            Settings
          </span>
        </a>
        <a
          mat-button
          fxLayoutAlign="start center"
          fxLayout="row"
          fxFlex
          style="padding-left: 24px;"
          href="https://github.com/bradtaniguchi/ng-flare"
        >
          <mat-icon>
            start
          </mat-icon>
          <span class="margin">
            Star
          </span>
        </a>
        <button
          mat-button
          fxLayoutAlign="start center"
          fxLayout="row"
          fxFlex
          style="padding-left: 24px;"
          (click)="report.emit()"
        >
          <mat-icon>
            report_problem
          </mat-icon>
          <span class="margin">
            Report Bug
          </span>
        </button>
        <button
          mat-button
          fxLayoutAlign="start center"
          fxLayout="row"
          fxFlex
          style="padding-left: 24px;"
          aria-label="Logout"
          (click)="logout.emit()"
        >
          <mat-icon>
            logout
          </mat-icon>
          <span class="margin">
            Logout
          </span>
        </button>
      </div>
    </div>
    <!--</mat-nav-list>-->
  `,
  styles: [
    `
      .nav-element {
        padding-left: 24px;
        border-radius: 0 25px 25px 0;
        height: 64px;
      }
    `,
    `
      ul {
        padding: 8px 0;
      }
    `,
    `
      .full-height {
        height: 100%;
      }
    `,
    `
      .side-nav-actions {
        margin: 8px 0;
        min-height: 80px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {
  @Output() logout = new EventEmitter();
  @Output() report = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
