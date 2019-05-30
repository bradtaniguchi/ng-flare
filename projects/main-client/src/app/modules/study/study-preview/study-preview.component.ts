import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-study-preview',
  template: `
    <p>
      study-preview works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyPreviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
