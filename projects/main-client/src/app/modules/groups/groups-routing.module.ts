import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: () =>
      import('./groups-create/groups-create.module').then(
        m => m.GroupsCreateModule
      )
  },
  {
    path: '',
    loadChildren: () =>
      import('./groups-list/groups-list.module').then(m => m.GroupsListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
