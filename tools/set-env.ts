require('dotenv').config();
import * as child_process from 'child_process';
import { writeFile, readFile } from 'fs';

const getRevision = (): Promise<string> => {
  console.log('getting hash...');
  return new Promise((resolve, reject) =>
    child_process.exec('git rev-parse HEAD', (err, stdout, stderr) =>
      err || stderr ? reject(err || stderr) : resolve(stdout.toString().trim())
    )
  );
};

const getAngularVersion = (pack: any) => pack.dependencies['@angular/core'];

const getFile = (path: string) =>
  new Promise((resolve, reject) =>
    readFile(path, (err, data) =>
      err ? reject(err) : resolve(JSON.parse(Buffer.from(data).toString()))
    )
  );
const writeFilePromise = (path: string, data: any) =>
  new Promise((resolve, reject) =>
    writeFile(path, data, err => (err ? reject(err) : resolve()))
  );

const getMissingVariables = () => {
  const envKeys = Object.keys(process.env);
  return [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_DATABASE_URL',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MSG_SENDER_ID'
  ].filter(key => !envKeys.includes(key) || !process.env[key]);
};

const targetPath = `./projects/main-client/src/app/config.env.ts`;
const getConfig = (params: { revision: string; version: string }) => `
import { Config } from './models/config';

export const CONFIG: Config = {
  revision: '${params.revision}',
  date: '${new Date()}',
  version: '${params.version}',
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY || ''}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || ''}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL || ''}',
    projectId: '${process.env.FIREBASE_PROJECT_ID || ''}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || ''}',
    messagingSenderId: '${process.env.FIREBASE_MSG_SENDER_ID || ''}'
  }
};
`;
(async () => {
  try {
    const revision = await getRevision();
    console.log('got hash', revision);

    const pack = await getFile('package.json');
    const version = getAngularVersion(pack);
    const falsyConfigValues = getMissingVariables();
    falsyConfigValues.forEach(key =>
      console.warn(`  environment key missing for key ${key}`)
    );
    if (falsyConfigValues.length) {
      console.warn('  See README.MD');
    }
    const config = getConfig({ revision, version });
    await writeFilePromise(targetPath, config);
    console.log(`Output generated at ${targetPath}`);
  } catch (err) {
    console.error(err);
  }
})();
