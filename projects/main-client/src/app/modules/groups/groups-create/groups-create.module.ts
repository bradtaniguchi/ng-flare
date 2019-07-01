import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsCreateRoutingModule } from './groups-create-routing.module';
import { GroupsCreateComponent } from './groups-create.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [GroupsCreateComponent],
  imports: [
    CommonModule,
    GroupsCreateRoutingModule,
    FormsModule,
    // angular material
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class GroupsCreateModule {}
