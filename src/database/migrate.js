import fs from 'fs';
import chalk from 'chalk';
import { lastMigrationPath, migrationListPath } from '../utils/constants/migrations.js';

const migrate = async () => {
  let data = await fs.promises.readFile(migrationListPath, 'utf-8');
  const migrationsList = data.trim().split('\n');
  if (migrationsList[0] === '') return;

  try {
    data = await fs.promises.readFile(lastMigrationPath, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.promises.writeFile(lastMigrationPath, '-1', 'utf-8');
      data = '-1';
    } else {
      throw error;
    }
  }

  const lastMigration = Number(data);

  for (let migrationIndex = lastMigration + 1; migrationIndex < migrationsList.length; migrationIndex++) {
    try {
      const { up } = await import(`../migrations/${migrationsList[migrationIndex]}.js`);
      const error = await up();
      if (error) {
        throw error;
      }
      console.log(chalk.green(`migrated ${migrationsList[migrationIndex]} successfully!`));
    } catch (error) {
      await fs.promises.writeFile(lastMigrationPath, `${migrationIndex - 1}`, 'utf-8');
      console.log(chalk.red(`error running migration ${migrationsList[migrationIndex]}`));
      console.log(error);
      return;
    }
  }
  await fs.promises.writeFile(lastMigrationPath, `${migrationsList.length - 1}`, 'utf-8');

  if (process.env.NODE_ENV === 'development') process.exit();
};

migrate();
