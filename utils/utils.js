import fs from 'node:fs';
import { readFile } from 'node:fs/promises';

export const toBool = [() => true, () => false];

export const getDbPassword = async (path) => {
  const exists = await fs.promises.access(path).then(...toBool);
  const passwordFilePath = exists ? path : 'password.txt';
  const password = await readFile(passwordFilePath, {
    encoding: 'utf8',
  });
  return password.trim();
};
