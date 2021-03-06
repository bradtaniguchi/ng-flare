import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerModule } from '../../../shared/loading-spinner/loading-spinner.module';
import { GroupsListRoutingModule } from './groups-list-routing.module';
import { GroupsListComponent } from './groups-list.component';
import { CreateFabModule } from '../../../shared/create-fab/create-fab.module';

@NgModule({
  declarations: [GroupsListComponent],
  imports: [
    CommonModule,
    GroupsListRoutingModule,
    RouterModule,
    LoadingSpinnerModule,
    CreateFabModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class GroupsListModule {}
