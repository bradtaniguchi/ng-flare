import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { DeckOverviewComponent } from './deck-overview.component';

@NgModule({
  declarations: [DeckOverviewComponent],
  imports: [
    CommonModule,
    RouterModule,
    // angular material
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [DeckOverviewComponent]
})
export class DeckOverviewModule {}
