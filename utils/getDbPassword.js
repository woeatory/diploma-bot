const fs = require('node:fs');
const { readFile } = require('node:fs/promises');

export const getPassword = async () => {
  const toBool = [() => true, () => false];

  const exists = await fs.promises
    .access(config['POSTGRES_PASSWORD_FILE'])
    .then(...toBool);
  const passwordFilePath = exists
    ? config['POSTGRES_PASSWORD_FILE']
    : 'password.txt';
  const password = await readFile(passwordFilePath, {
    encoding: 'utf8',
  });
  return password.trim();
};
