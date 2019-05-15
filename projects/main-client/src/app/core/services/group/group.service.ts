import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference
} from '@angular/fire/firestore';
import { Collections } from '../../collections';
import { Group } from '../../../models/group';
import { Observable, from, combineLatest } from 'rxjs';
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
      } as Group)
    );
  }

  /**
   * Returns a list of all groups that are public
   */
  public list(params: { orderBy: string; limit: number }): Observable<Group[]> {
    const { orderBy, limit } = params;
    return this.db
      .collection<Group>(Collections.Groups, ref =>
        ref
          .where('public', '==', true)
          .orderBy(orderBy)
          .limit(limit)
      )
      .valueChanges();
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
   * Returns the users default group, which is created when the user is created, and has the
   * same user id.
   */
  public getDefaultGroup(user: User): Observable<Group> {
    return this.groupCollection.doc<Group>(user.uid).valueChanges();
  }

  /**
   * Creates the users default group
   */
  public createDefaultGroup(user: User): Observable<void> {
    return from(
      this.groupCollection.doc(user.uid).set({
        uid: user.uid,
        createdBy: user.uid,
        description: 'Users default group',
        createdOn: new Date(),
        name: 'Default Group',
        public: false
      } as Group)
    );
  }

  /**
   * Returns the groups the user has access to according to the users permissions
   */
  public listUserGroups(params: {
    permissions: Permission[];
  }): Observable<Group[]> {
    const { permissions } = params;
    return combineLatest(
      permissions
        .map(({ groupId }) => groupId)
        .filter(_ => !!_)
        .map(uid => this.get(uid))
    );
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
        userId: user.uid,
        createdOn: new Date()
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
    user: User;
  }): Observable<void> {
    const { user } = params;
    const uid = params.group.uid;
    return from(
      this.groupCollection.doc(uid).update({
        public: params.public,
        updatedOn: new Date(),
        updatedBy: user.uid
      } as Partial<Group>)
    );
  }

  /**
   * Makes the group public
   */
  public makePublic(params: { group: Group; user: User }): Observable<void> {
    const { group, user } = params;
    return this.setPublic({
      group,
      user,
      public: true
    });
  }

  /**
   * Makes the group private
   */
  public makePrivate(params: { group: Group; user: User }): Observable<void> {
    const { group, user } = params;
    return this.setPublic({
      group,
      user,
      public: false
    });
  }
}
