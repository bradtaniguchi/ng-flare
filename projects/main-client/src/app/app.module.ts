import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store/app-store.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { CONFIG } from './config.env';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HeaderModule } from './core/header/header.module';
import { MatSidenavModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
