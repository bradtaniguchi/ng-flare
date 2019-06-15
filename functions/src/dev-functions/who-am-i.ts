import { https } from 'firebase-functions';

export const whoAmI = https.onCall((data, context) => {
  if (!context.auth) {
    return {
      status: 'error',
      code: 401,
      message: 'Not signed in'
    };
  }
  return {};
});
