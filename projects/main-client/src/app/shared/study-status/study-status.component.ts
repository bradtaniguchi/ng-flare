import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { StudyService } from '../../core/services/study/study.service';
import { Card } from '../../models/card';
import { Duration } from 'luxon';

@Component({
  selector: 'app-study-status',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <mat-progress-bar
        mode="determinate"
        [value]="value"
        color="primary"
      ></mat-progress-bar>
    </div>
    <div>
      <span fxFlex="25"> Duration: {{ duration }} </span>
      <span fxFlex="25"> Wrong: {{ wrong }} </span>
      <span fxFlex="25"> Correct: {{ correct }} </span>
      <span fxFlex="25"> Skipped: {{ skipped }} </span>
      <!-- TODO: add sections displaying how many right/wrong -->
      <!--
        NOTE: see here as an example of "enter" animation:
        https://stackoverflow.com/questions/43967392/creating-a-transition-when-changing-properties-in-angular-2-4
      -->
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyStatusComponent implements OnInit {
  @Input() duration: Duration;
  // total cards
  @Input() cards: Array<string | Card>;
  // inputs
  @Input() wrong: Array<string | Card>;
  @Input() correct: Array<string | Card>;
  @Input() skipped: Array<string | Card>;

  /**
   * Returns the progress bar value
   */
  get value(): number {
    return this.studyService.getCompletedPercentage(this);
  }
  constructor(private studyService: StudyService) {}

  ngOnInit() {}
}
