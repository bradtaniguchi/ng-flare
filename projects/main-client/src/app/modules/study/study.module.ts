import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyRoutingModule } from './study-routing.module';
import { StoreModule } from '@ngrx/store';
import { StudyReducer } from './store/study.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudyRoutingModule,
    // ngrx
    StoreModule.forFeature('study', StudyReducer)
  ]
})
export class StudyModule {}
