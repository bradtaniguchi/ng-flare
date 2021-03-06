import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecksCreateComponent } from './decks-create.component';

const routes: Routes = [
  {
    path: '',
    component: DecksCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksCreateRoutingModule {}
