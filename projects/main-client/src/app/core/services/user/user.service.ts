import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Collections } from '../../collections';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { User } from '../../../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(private db: AngularFirestore) {
    this.userCollection = this.db.collection(Collections.Users);
  }

  /**
   * Returns the observable of the user
   */
  public get(id: string): Observable<User> {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  /**
   * Returns if the given user exists already within the database
   */
  public exists(user: firebase.User): Observable<boolean> {
    const user$ = this.db
      .collection(Collections.Users)
      .doc(user.uid)
      .get();
    return user$.pipe(map(document => document.exists));
  }

  /**
   * Creates a new user
   */
  public create(user: firebase.User): Observable<void> {
    return from(
      this.userCollection.doc(user.uid).set({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
      } as User)
    );
  }

  /**
   * Updates the last login for the given user
   */
  public updateLogin(user: firebase.User | User): Observable<void> {
    return from(
      this.userCollection.doc(user.uid).update({
        lastLogin: new Date()
      } as Partial<User>)
    );
  }
}
