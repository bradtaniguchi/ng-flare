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
import { DrawerReducer } from './drawer/drawer.state';
import { GroupReducer } from './group/group.state';
import { GroupEffects } from './group/group.effects';
import { DeckReducer } from './deck/deck.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ngrx
    StoreModule.forRoot<AppState>({
      auth: AuthReducer,
      loading: LoadingReducer,
      drawer: DrawerReducer,
      group: GroupReducer,
      deck: DeckReducer
    }),
    EffectsModule.forRoot([AuthEffects, NotifyEffects, GroupEffects]),
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
