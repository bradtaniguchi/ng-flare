import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardEditRoutingModule } from './dashboard-edit-routing.module';
import { DashboardEditComponent } from './dashboard-edit.component';

@NgModule({
  declarations: [DashboardEditComponent],
  imports: [CommonModule, DashboardEditRoutingModule]
})
export class DashboardEditModule {}
