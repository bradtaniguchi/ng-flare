import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidUserIdDirective } from './valid-user-id.directive';

@NgModule({
  declarations: [ValidUserIdDirective],
  imports: [CommonModule],
  exports: [ValidUserIdDirective]
})
export class ValidUserIdModule {}
