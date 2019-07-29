import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dwr-deck-actions',
  template: `
    <p>
      dwr-deck-actions works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DwrDeckActionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
