import { https } from 'firebase-functions';

export const helloWorld = https.onCall((_, response) => {
  return { message: 'Hello from Firebase! 222' };
});
