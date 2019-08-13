import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyPreviewRoutingModule } from './study-preview-routing.module';
import { StudyPreviewComponent } from './study-preview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlipCardModule } from '../../../shared/flip-card/flip-card.module';
import { LoadingSpinnerModule } from '../../../shared/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [StudyPreviewComponent],
  imports: [
    CommonModule,
    StudyPreviewRoutingModule,
    FlipCardModule,
    LoadingSpinnerModule,
    // angular material
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class StudyPreviewModule {}
