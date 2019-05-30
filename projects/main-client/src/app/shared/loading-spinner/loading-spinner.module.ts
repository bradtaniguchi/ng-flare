import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, FlexLayoutModule, MatProgressSpinnerModule],
  exports: [LoadingSpinnerComponent]
})
export class LoadingSpinnerModule {}
