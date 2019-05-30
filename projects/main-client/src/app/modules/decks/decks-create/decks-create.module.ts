import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksCreateRoutingModule } from './decks-create-routing.module';
import { DecksCreateComponent } from './decks-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DecksCreateComponent],
  imports: [
    CommonModule,
    DecksCreateRoutingModule,
    // flex layout module
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class DecksCreateModule {}
