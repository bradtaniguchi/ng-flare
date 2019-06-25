import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { DeckOverviewModule } from '../../shared/deck-overview/deck-overview.module';
import { LoadingSpinnerModule } from '../../shared/loading-spinner/loading-spinner.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    // app modules
    LoadingSpinnerModule,
    DeckOverviewModule,
    // angular material
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DashboardModule {}
