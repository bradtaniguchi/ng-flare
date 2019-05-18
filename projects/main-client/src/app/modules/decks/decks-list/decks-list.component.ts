import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-decks-list',
  template: `
    <p>
      decks-list works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecksListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
