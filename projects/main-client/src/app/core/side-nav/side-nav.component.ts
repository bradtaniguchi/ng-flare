import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  template: `
    <!--<mat-nav-list fxLayout="column">-->
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
        <li>
          <!-- <div mat-list-item type="button">
            <mat-icon mat-list-icon>
              settings
            </mat-icon>
            <div mat-line>
              Info
            </div>
          </div> -->
        </li>
      </ul>
    </nav>
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
