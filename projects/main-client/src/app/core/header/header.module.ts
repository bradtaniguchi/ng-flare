import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    // angular material
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
