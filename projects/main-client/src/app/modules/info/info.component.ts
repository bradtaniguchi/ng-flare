import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CONFIG } from '../../config.env';

@Component({
  selector: 'app-info',
  template: `
    <div>
      <pre>
        {{ config | json }}
      </pre
      >
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {
  public config = {
    revision: CONFIG.revision,
    date: CONFIG.date,
    tag: CONFIG.tag,
    tagVersion: CONFIG.tagVersion,
    tagBuildEnvironment: CONFIG.tagBuildEnvironment
  };
  constructor() {}

  ngOnInit() {}
}
