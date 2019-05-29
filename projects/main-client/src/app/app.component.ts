import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from './models/group';

@Component({
  selector: 'app-root',
  template: `
    <app-header
      [group]="group$ | async"
      (toggleMenu)="onToggleMenu()"
    ></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public group$: Observable<Group | undefined>;

  constructor() {}

  ngOnInit() {
    this.group$ = of();
  }

  public onToggleMenu() {
    console.log('toggle menu');
  }
}
