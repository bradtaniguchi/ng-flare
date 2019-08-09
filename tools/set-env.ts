require('dotenv').config();
import * as child_process from 'child_process';
import { writeFile, readFile, exists, access, constants } from 'fs';
import { ENV_PATH } from './env-path';

const getRevision = (): Promise<string> => {
  console.log('getting hash...');
  return new Promise((resolve, reject) =>
    child_process.exec('git rev-parse HEAD', (err, stdout, stderr) =>
      err || stderr ? reject(err || stderr) : resolve(stdout.toString().trim())
    )
  );
};

const getTag = (): Promise<string> => {
  console.log('getting tag...');
  return new Promise((resolve, reject) =>
    child_process.exec('git describe --tags', (err, stdout, stderr) =>
      err || stderr ? reject(err || stderr) : resolve(stdout.toString().trim())
    )
  );
};

const getAngularVersion = (pack: any) => pack.dependencies['@angular/core'];

const getFileExists = (path: string) =>
  new Promise((resolve, reject) =>
    access(path, constants.F_OK, err => (err ? resolve(false) : resolve(true)))
  );

const getPackageJson = (path: string) =>
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

const getTagVersion = (tag: string) => {
  const res = /([0-9].[0-9].[0-9])$/.exec(tag);
  return res ? res[0] : '';
};

const getTagBuildEnvironment = (tag: string): string => {
  const res = /^([a-zA-Z]*)/.exec(tag);
  return res ? res[0] : '';
};

const getConfig = (params: {
  revision: string;
  version: string;
  tag: string;
}) => `
import { Config } from './models/config';

export const CONFIG: Config = {
  revision: '${params.revision}',
  date: '${new Date()}',
  version: '${params.version}',
  tag: '${params.tag}',
  tagVersion: '${getTagVersion(params.tag)}',
  tagBuildEnvironment: '${getTagBuildEnvironment(params.tag)}',
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
    const fileExists = await getFileExists(ENV_PATH);
    if (fileExists) {
      console.log('env file already exists, skipping...');
      return;
    }
    const [revision, tag, pack] = await Promise.all([
      getRevision(),
      getTag(),
      getPackageJson('package.json')
    ]);
    console.log('got hash', revision);

    const version = getAngularVersion(pack);
    const falsyConfigValues = getMissingVariables();
    falsyConfigValues.forEach(key =>
      console.warn(`  environment key missing for key ${key}`)
    );
    if (falsyConfigValues.length) {
      console.warn('  See README.md');
    }
    const config = getConfig({ revision, version, tag });
    await writeFilePromise(ENV_PATH, config);
    console.log(`Output generated at ${ENV_PATH}`);
  } catch (err) {
    console.error(err);
    // re-throw the error so we can crash the build process
    throw err;
  }
})();
