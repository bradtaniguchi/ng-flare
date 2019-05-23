import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    // angular material
    FlexLayoutModule,
    MatToolbarModule
  ]
})
export class HeaderModule {}
