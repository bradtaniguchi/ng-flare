import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-study-review',
  template: `
    <p>
      study-review works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyReviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
