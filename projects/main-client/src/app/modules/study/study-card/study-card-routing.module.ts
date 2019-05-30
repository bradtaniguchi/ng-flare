import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyCardComponent } from './study-card.component';

const routes: Routes = [
  {
    path: '',
    component: StudyCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyCardRoutingModule {}
