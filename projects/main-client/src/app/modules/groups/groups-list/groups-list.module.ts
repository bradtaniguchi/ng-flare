import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsListRoutingModule } from './groups-list-routing.module';
import { GroupsListComponent } from './groups-list.component';

@NgModule({
  declarations: [GroupsListComponent],
  imports: [CommonModule, GroupsListRoutingModule]
})
export class GroupsListModule {}
