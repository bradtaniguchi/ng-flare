import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyPreviewComponent } from './study-preview.component';

const routes: Routes = [
  {
    path: '',
    component: StudyPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyPreviewRoutingModule {}
