import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: './decks-create/decks-create.module#DecksCreateModule'
  },
  {
    path: '',
    loadChildren: './decks-list/decks-list.module#DecksListModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule {}
