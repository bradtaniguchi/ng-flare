import { Document } from './document';

export interface Card extends Document {
  deckId: string;
  front: string;
  back: string;
}
