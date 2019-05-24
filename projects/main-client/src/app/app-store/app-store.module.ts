import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app-state';
import { AuthReducer } from './auth/auth.state';
import { LoadingReducer } from './loading/loading.state';
import { AuthEffects } from './auth/auth.effects';
import { NotifyEffects } from './notify/notify.effects';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ngrx
    StoreModule.forRoot<AppState>({
      auth: AuthReducer,
      loading: LoadingReducer
    }),
    EffectsModule.forRoot([AuthEffects, NotifyEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    // global material services
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class AppStoreModule {}
