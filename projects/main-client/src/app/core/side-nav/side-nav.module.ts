import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatListModule,
  MatIconModule,
  MatRippleModule,
  MatButtonModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    // angular material
    FlexLayoutModule,
    MatRippleModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [SideNavComponent]
})
export class SideNavModule {}
