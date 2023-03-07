import fs from 'fs';

import { migrationListPath, migrationTemplatePath } from '../utils/constants/migrations.js';

const createMigration = async () => {
  const migrationTemplate = await fs.promises.readFile(migrationTemplatePath, 'utf-8');
  const migrationName = process.argv[2];
  await fs.promises.appendFile(migrationListPath, migrationName + '\n', 'utf-8');
  await fs.promises.writeFile(`./src/migrations/${migrationName}.js`, migrationTemplate, 'utf-8');
};

createMigration();
