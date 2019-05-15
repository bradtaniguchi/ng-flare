import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference
} from '@angular/fire/firestore';
import { Collections } from '../../collections';
import { Group } from '../../../models/group';
import { Observable, from } from 'rxjs';
import { User } from '../../../models/user';
import { Permission } from '../../../models/permission';
import { RoleType } from '../../../models/role';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupCollection: AngularFirestoreCollection<Group>;
  private permissionCollection: AngularFirestoreCollection<Permission>;
  constructor(private db: AngularFirestore) {
    this.groupCollection = this.db.collection(Collections.Groups);
    this.permissionCollection = this.db.collection(Collections.Permissions);
  }

  /**
   * Creates a new group
   */
  public create(group: Partial<Group>): Observable<void> {
    const uid = this.db.createId();
    return from(
      this.groupCollection.doc(uid).set({
        uid,
        ...group,
        createdOn: new Date()
      } as Partial<Group>)
    );
  }

  /**
   * Returns the given group
   */
  public get(groupId: string): Observable<Group> {
    return this.groupCollection.doc<Group>(groupId).valueChanges();
  }

  public update(group: Partial<Group>): Observable<void> {
    const { uid } = group;
    return from(
      this.groupCollection.doc(uid).update({
        uid,
        ...group,
        updatedOn: new Date()
      } as Partial<Group>)
    );
  }

  /**
   * Returns the given users permissions for the given group
   */
  public getPermissions(params: {
    group: Partial<Group>;
    user: Partial<User>;
  }): Observable<Permission[]> {
    const { group, user } = params;
    return this.db
      .collection<Permission>(Collections.Permissions, ref =>
        ref.where('userId', '==', user.uid).where('groupId', '==', group.uid)
      )
      .valueChanges();
  }

  /**
   * Adds the user to the group
   */
  public join(params: {
    type: RoleType;
    group: Partial<Group>;
    user: Partial<User>;
  }): Observable<DocumentReference> {
    const { type, group, user } = params;
    return from(
      this.permissionCollection.add({
        groupId: group.uid,
        type,
        userId: user.uid
      })
    );
  }

  /**
   * Has the user leave the given group
   */
  public leave(params: {
    group: Partial<Group>;
    user: Partial<User>;
  }): Observable<void> {
    const { group, user } = params;
    const batch = this.db.firestore.batch();
    return from(
      this.db
        .collection(Collections.Permissions, ref =>
          ref.where('groupId', '==', group.uid).where('userId', '==', user.uid)
        )
        .ref.get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => batch.delete(doc.ref));
          return batch.commit();
        })
    );
  }

  /**
   * Sets the group as public or private
   */
  public setPublic(params: {
    group: Group;
    public: boolean;
  }): Observable<void> {
    const uid = params.group.uid;
    return from(
      this.groupCollection.doc(uid).update({
        public: params.public
      } as Partial<Group>)
    );
  }

  /**
   * Makes the group public
   */
  public makePublic(group: Group): Observable<void> {
    return this.setPublic({
      group,
      public: true
    });
  }

  /**
   * Makes the group private
   */
  public makePrivate(group: Group): Observable<void> {
    return this.setPublic({
      group,
      public: false
    });
  }
}
