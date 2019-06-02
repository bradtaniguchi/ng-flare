import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((_, response) => {
  response.send('Hello from Firebase! 222');
});

export const reportErrors = functions.https.onRequest((request, response) => {
  console.log(request);
  response.send({
    status: 200
  });
});
