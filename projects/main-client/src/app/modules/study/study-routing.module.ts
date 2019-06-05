import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':deckId/preview',
    loadChildren: './study-preview/study-preview.module#StudyPreviewModule'
  },
  {
    path: ':deckId/review',
    loadChildren: './study-review/study-review.module#StudyReviewModule'
  },
  {
    path: ':deckId/card/:cardId',
    loadChildren: './study-card/study-card.module#StudyCardModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule {}
