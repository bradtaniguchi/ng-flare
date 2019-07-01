import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AppState } from './app-state';
import { AuthEffects } from './auth/auth.effects';
import { AuthReducer } from './auth/auth.state';
import { DeckEffects } from './deck/deck.effects';
import { DeckReducer } from './deck/deck.state';
import { DrawerReducer } from './drawer/drawer.state';
import { GroupEffects } from './group/group.effects';
import { GroupReducer } from './group/group.state';
import { LoadingReducer } from './loading/loading.state';
import { NotifyEffects } from './notify/notify.effects';
import { CardReducer } from './cards/card.state';
import { CardEffects } from './cards/card.effects';
import { RouteEffects } from './route/route.effects';
import { RouteReducer } from './route/route.state';
import { ErrorEffects } from './error/error.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ngrx
    StoreModule.forRoot<AppState>({
      auth: AuthReducer,
      loading: LoadingReducer,
      route: RouteReducer,
      drawer: DrawerReducer,
      group: GroupReducer,
      deck: DeckReducer,
      card: CardReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      NotifyEffects,
      RouteEffects,
      GroupEffects,
      DeckEffects,
      CardEffects,
      ErrorEffects
    ]),
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
