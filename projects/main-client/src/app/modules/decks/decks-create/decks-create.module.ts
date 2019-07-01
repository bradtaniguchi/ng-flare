import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
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
