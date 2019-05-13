import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksCreateRoutingModule } from './decks-create-routing.module';
import { DecksCreateComponent } from './decks-create.component';

@NgModule({
  declarations: [DecksCreateComponent],
  imports: [CommonModule, DecksCreateRoutingModule]
})
export class DecksCreateModule {}
