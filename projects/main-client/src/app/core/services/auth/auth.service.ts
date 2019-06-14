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

  /**
   * Login using google auth login
   */
  public googleLogin(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return this.loginWithPopup(provider);
  }

  /**
   * Login using github auth login
   */
  public githubLogin(): Observable<auth.UserCredential> {
    const provider = new auth.GithubAuthProvider();
    return this.loginWithPopup(provider);
  }

  /**
   * Login the user using email and password
   */
  public loginWithEmailPassword(params: {
    email: string;
    password: string;
  }): Observable<auth.UserCredential> {
    const { email, password } = params;
    return from(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  public signOut(): Observable<void> {
    return from(this.fireAuth.auth.signOut());
  }

  /**
   * Utility method to login with the given provider
   */
  private loginWithPopup(
    provider: auth.AuthProvider
  ): Observable<auth.UserCredential> {
    return from(this.fireAuth.auth.signInWithPopup(provider));
  }

  // TODO: not used
  private loginWithRedirect(provider: auth.AuthProvider) {
    return from(this.fireAuth.auth.signInWithRedirect(provider));
  }
}
