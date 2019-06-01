import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatCardModule
} from '@angular/material';
import { DecksCreateRoutingModule } from './decks-create-routing.module';
import { DecksCreateComponent } from './decks-create.component';

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
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ]
})
export class DecksCreateModule {}
