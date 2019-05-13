import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: './groups-create/groups-create.module#GroupsCreateModule'
  },
  {
    path: '',
    loadChildren: './groups-list/groups-list.module#GroupsListModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
