import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardReducer } from './store/dashboard.state';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { LoadingSpinnerModule } from '../../shared/loading-spinner/loading-spinner.module';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';
import { RouterModule } from '@angular/router';
import { DeckOverviewModule } from '../../shared/deck-overview/deck-overview.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    // app modules
    LoadingSpinnerModule,
    DeckOverviewModule,
    // ngrx
    StoreModule.forFeature('dashboard', DashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    // angular material
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DashboardModule {}
