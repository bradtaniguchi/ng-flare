import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardEditComponent } from './dashboard-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardEditRoutingModule {}
