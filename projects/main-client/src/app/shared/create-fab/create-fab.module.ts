import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFabComponent } from './create-fab.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateFabComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  exports: [CreateFabComponent]
})
export class CreateFabModule {}
