import { Document } from './document';

export interface StudySession extends Document {
  startedOn: Date;
  endedOn: Date;
  missed: string[];
  correct: string[];
  skipped: string[];
  groupId: string;
  deckId: string;
}
