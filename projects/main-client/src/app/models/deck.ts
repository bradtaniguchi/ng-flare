import { Document } from './document';

export interface Deck extends Document {
  uid: string;
  group: string;
  name: string;
  description: string;
}
