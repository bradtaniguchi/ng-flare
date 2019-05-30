import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyCardRoutingModule } from './study-card-routing.module';
import { StudyCardComponent } from './study-card.component';

@NgModule({
  declarations: [StudyCardComponent],
  imports: [CommonModule, StudyCardRoutingModule]
})
export class StudyCardModule {}
