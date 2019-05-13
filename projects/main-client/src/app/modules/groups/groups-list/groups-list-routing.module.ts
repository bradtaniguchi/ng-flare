import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsListComponent } from './groups-list.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsListRoutingModule {}
