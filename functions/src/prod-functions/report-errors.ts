import { https } from 'firebase-functions';

/**
 * TODO: reports errors for winston logging
 */
export const reportErrors = https.onRequest((request, response) => {
  console.log(request);
  response.send({
    status: 200
  });
});
