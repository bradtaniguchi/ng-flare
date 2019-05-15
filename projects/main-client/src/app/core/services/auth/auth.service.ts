import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { auth } from 'firebase/app';
import { AppState } from '../../../app-store/app-state';
import { AuthStateChange } from '../../../app-store/auth/auth.actions';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {
    this.fireAuth.authState.subscribe(user =>
      this.store.dispatch(new AuthStateChange({ user }))
    );
  }

  private login(provider: auth.AuthProvider): Observable<auth.UserCredential> {
    return from(this.fireAuth.auth.signInWithPopup(provider));
  }

  public googleLogin(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return this.login(provider);
  }

  public githubLogin(): Observable<auth.UserCredential> {
    const provider = new auth.GithubAuthProvider();
    return this.login(provider);
  }

  public signOut(): Observable<void> {
    return from(this.fireAuth.auth.signOut());
  }
}
