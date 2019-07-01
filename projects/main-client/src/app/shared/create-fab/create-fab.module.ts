import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFabComponent } from './create-fab.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateFabComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  exports: [CreateFabComponent]
})
export class CreateFabModule {}
