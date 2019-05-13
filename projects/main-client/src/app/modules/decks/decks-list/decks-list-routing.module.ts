import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecksListComponent } from './decks-list.component';

const routes: Routes = [
  {
    path: '',
    component: DecksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksListRoutingModule {}
