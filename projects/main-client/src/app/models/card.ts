import { Document } from './document';

export interface Card extends Document {
  group: string;
  deck: string;
  front?: string;
  back?: string;
}
