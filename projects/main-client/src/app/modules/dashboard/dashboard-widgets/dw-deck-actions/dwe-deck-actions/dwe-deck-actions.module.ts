import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DweDeckActionsComponent } from './dwe-deck-actions.component';

@NgModule({
  declarations: [DweDeckActionsComponent],
  imports: [CommonModule],
  exports: [DweDeckActionsComponent],
  entryComponents: [DweDeckActionsComponent]
})
export class DweDeckActionsModule {}
