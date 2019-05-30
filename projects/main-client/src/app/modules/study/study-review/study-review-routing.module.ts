import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyReviewComponent } from './study-review.component';

const routes: Routes = [
  {
    path: '',
    component: StudyReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyReviewRoutingModule {}
