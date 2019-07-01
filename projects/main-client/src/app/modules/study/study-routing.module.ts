import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':deckId/preview',
        loadChildren: () =>
          import('./study-preview/study-preview.module').then(
            m => m.StudyPreviewModule
          )
      },
      {
        path: ':deckId/review',
        loadChildren: () =>
          import('./study-review/study-review.module').then(
            m => m.StudyReviewModule
          )
      },
      {
        path: ':deckId/card/:cardId',
        loadChildren: () =>
          import('./study-card/study-card.module').then(m => m.StudyCardModule)
      }
      // TODO: add!
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   loadChildren: './study-card/study-card-list.module#StudyCardListModule'
      // }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule {}
