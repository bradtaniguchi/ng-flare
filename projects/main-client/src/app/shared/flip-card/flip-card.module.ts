import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipCardComponent } from './flip-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [FlipCardComponent],
  imports: [
    CommonModule,

    // angular material
    MatCardModule
  ],
  exports: [FlipCardComponent]
})
export class FlipCardModule {}
