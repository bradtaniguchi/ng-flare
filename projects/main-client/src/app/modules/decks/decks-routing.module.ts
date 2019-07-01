import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: () =>
      import('./decks-create/decks-create.module').then(
        m => m.DecksCreateModule
      )
  },
  {
    path: '',
    loadChildren: () =>
      import('./decks-list/decks-list.module').then(m => m.DecksListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule {}
