import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsCreateRoutingModule } from './groups-create-routing.module';
import { GroupsCreateComponent } from './groups-create.component';

@NgModule({
  declarations: [GroupsCreateComponent],
  imports: [CommonModule, GroupsCreateRoutingModule]
})
export class GroupsCreateModule {}
