import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-edit',
  template: `
    <p>
      dashboard-edit works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEditComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
