require('dotenv').config();
import { writeFile } from 'fs';

const targetPath = './projects/main-client-e2e/src/e2e-config.env.ts';

const write = (path: string, data: any) =>
  new Promise((resolve, reject) =>
    writeFile(path, data, err => (err ? reject(err) : resolve()))
  );

const getConfig = () => `
import { E2EConfig } from './e2e-config';

export const CONFIG: E2EConfig = {
  email: '${process.env.E2E_EMAIL}',
  password: '${process.env.E2E_PASSWORD}'
};
`;
(async () => {
  try {
    const config = getConfig();
    await write(targetPath, config);
    console.log(`Output generated at ${targetPath}`);
  } catch (err) {
    console.error(err);
  }
})();
