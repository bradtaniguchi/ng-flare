import { unlink } from 'fs';
import { ENV_PATH } from './env-path';

const removeFile = (path: string) =>
  new Promise((resolve, reject) =>
    unlink(path, err => (err ? reject(err) : resolve()))
  );

(async () => {
  try {
    console.log(`removing env file ${ENV_PATH}`);
    await removeFile(ENV_PATH);
    console.log('removed env file');
  } catch (err) {
    console.error(err);
    throw err;
  }
})();
