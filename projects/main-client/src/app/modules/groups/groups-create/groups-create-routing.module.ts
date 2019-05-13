import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsCreateComponent } from './groups-create.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsCreateRoutingModule {}
