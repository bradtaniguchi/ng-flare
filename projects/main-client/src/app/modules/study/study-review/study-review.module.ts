import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyReviewRoutingModule } from './study-review-routing.module';
import { StudyReviewComponent } from './study-review.component';

@NgModule({
  declarations: [StudyReviewComponent],
  imports: [CommonModule, StudyReviewRoutingModule]
})
export class StudyReviewModule {}
