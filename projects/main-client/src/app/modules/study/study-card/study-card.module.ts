import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyCardRoutingModule } from './study-card-routing.module';
import { StudyCardComponent } from './study-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudyStatusModule } from '../../../shared/study-status/study-status.module';

@NgModule({
  declarations: [StudyCardComponent],
  imports: [
    CommonModule,
    StudyCardRoutingModule,
    // flex module
    FlexLayoutModule,
    StudyStatusModule
  ]
})
export class StudyCardModule {}
