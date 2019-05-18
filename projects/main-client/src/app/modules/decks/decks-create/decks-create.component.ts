import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-decks-create',
  template: `
    <p>
      decks-create works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecksCreateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
