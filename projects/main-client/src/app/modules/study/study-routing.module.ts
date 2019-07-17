import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'deck/card/:deckId/preview',
        loadChildren: () =>
          import('./study-preview/study-preview.module').then(
            m => m.StudyPreviewModule
          )
      },
      {
        path: 'deck/:deckId/review',
        loadChildren: () =>
          import('./study-review/study-review.module').then(
            m => m.StudyReviewModule
          )
      },
      {
        path: 'deck/:deckId/card/:cardId',
        loadChildren: () =>
          import('./study-card/study-card.module').then(m => m.StudyCardModule)
      }
      // TODO: add the following routes:
      // 1. decks - list of decks in the current group we can go study, and change group
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule {}
