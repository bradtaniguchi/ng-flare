import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DeckOverviewModule } from '../../../shared/deck-overview/deck-overview.module';
import { StudyDeckListRoutingModule } from './study-deck-list-routing.module';
import { StudyDeckListComponent } from './study-deck-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoadingSpinnerModule } from '../../../shared/loading-spinner/loading-spinner.module';
@NgModule({
  declarations: [StudyDeckListComponent],
  imports: [
    CommonModule,
    StudyDeckListRoutingModule,
    // app
    DeckOverviewModule,
    LoadingSpinnerModule,
    // angular material
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class StudyDeckListModule {}
