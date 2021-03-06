import { Document } from './document';

export interface Group extends Document {
  uid: string;
  name: string;
  description: string;
  public: boolean;
}
