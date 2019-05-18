import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-groups-create',
  template: `
    <p>
      groups-create works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsCreateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
