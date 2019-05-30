import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyPreviewRoutingModule } from './study-preview-routing.module';
import { StudyPreviewComponent } from './study-preview.component';

@NgModule({
  declarations: [StudyPreviewComponent],
  imports: [CommonModule, StudyPreviewRoutingModule]
})
export class StudyPreviewModule {}
