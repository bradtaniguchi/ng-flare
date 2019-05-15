import { Document } from './document';

export interface Deck extends Document {
  uid: string;
  groupId: string;
  name: string;
  description: string;
}
