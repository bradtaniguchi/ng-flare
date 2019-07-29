import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetsEditDirective } from './dashboard-widgets-edit.directive';

@NgModule({
  declarations: [DashboardWidgetsEditDirective],
  imports: [CommonModule],
  exports: [DashboardWidgetsEditDirective]
})
export class DashboardWidgetsEditModule {}
