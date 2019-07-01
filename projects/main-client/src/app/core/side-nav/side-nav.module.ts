import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
