import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyStatusComponent } from './study-status.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [StudyStatusComponent],
  imports: [
    CommonModule,

    // angular material
    FlexLayoutModule,
    MatProgressBarModule
  ],
  exports: [StudyStatusComponent]
})
export class StudyStatusModule {}
