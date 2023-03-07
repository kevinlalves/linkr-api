import fs from 'fs';
import chalk from 'chalk';

import { migrationListPath, migrationTemplatePath } from '../utils/constants/migrations.js';

const createMigration = async () => {
  const migrationTemplate = await fs.promises.readFile(migrationTemplatePath, 'utf-8');
  const migrationName = process.argv[2];
  if (!migrationName) {
    console.log(chalk.red('Migration must have a name'));
    return;
  }

  await fs.promises.appendFile(migrationListPath, migrationName, 'utf-8');
  await fs.promises.writeFile(`./src/migrations/${migrationName}.js`, migrationTemplate, 'utf-8');
  console.log(chalk.green(`migration ${migrationName} succefully created`));
};

createMigration();
