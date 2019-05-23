export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdOn?: Date;
  lastLogin?: Date;
}
