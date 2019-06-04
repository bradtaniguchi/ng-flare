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
import { UserIconModule } from '../../shared/user-icon/user-icon.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserIconModule,
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
