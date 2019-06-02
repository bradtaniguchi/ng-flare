import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSidenavModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store/app-store.module';
import { AppComponent } from './app.component';
import { CONFIG } from './config.env';
import { HeaderModule } from './core/header/header.module';
import { initAppFactory } from './init';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // app modules
    AppStoreModule,
    // angular firebase
    AngularFireModule.initializeApp(CONFIG.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // core display modules
    HeaderModule,
    // core angular material
    MatSidenavModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [AngularFireAuth, Store],
      multi: true,
      useFactory: initAppFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
