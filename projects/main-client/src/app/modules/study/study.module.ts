import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyRoutingModule } from './study-routing.module';
import { StoreModule } from '@ngrx/store';
import { StudyReducer } from './store/study.state';
import { EffectsModule } from '@ngrx/effects';
import { StudyEffects } from './store/study.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudyRoutingModule,
    // ngrx
    StoreModule.forFeature('study', StudyReducer),
    EffectsModule.forFeature([StudyEffects])
  ]
})
export class StudyModule {}
