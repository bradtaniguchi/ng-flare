import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksListRoutingModule } from './decks-list-routing.module';
import { DecksListComponent } from './decks-list.component';

@NgModule({
  declarations: [DecksListComponent],
  imports: [CommonModule, DecksListRoutingModule]
})
export class DecksListModule {}
