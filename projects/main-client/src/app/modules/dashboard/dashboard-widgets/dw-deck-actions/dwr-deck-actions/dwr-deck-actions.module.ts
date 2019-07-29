import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DwrDeckActionsComponent } from './dwr-deck-actions.component';

@NgModule({
  declarations: [DwrDeckActionsComponent],
  imports: [CommonModule],
  exports: [DwrDeckActionsComponent],
  entryComponents: [DwrDeckActionsComponent]
})
export class DwrDeckActionsModule {}
