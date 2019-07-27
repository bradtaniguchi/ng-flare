import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'decks/:deckId/preview',
        loadChildren: () =>
          import('./study-preview/study-preview.module').then(
            m => m.StudyPreviewModule
          )
      },
      {
        path: 'decks/:deckId/review',
        loadChildren: () =>
          import('./study-review/study-review.module').then(
            m => m.StudyReviewModule
          )
      },
      {
        path: 'decks/:deckId/cards/:cardId',
        loadChildren: () =>
          import('./study-card/study-card.module').then(m => m.StudyCardModule)
      },
      {
        path: 'decks',
        loadChildren: () =>
          import('./study-deck-list/study-deck-list.module').then(
            m => m.StudyDeckListModule
          )
      },
      {
        path: '',
        redirectTo: 'decks'
      }
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
