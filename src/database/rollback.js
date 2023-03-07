import fs from 'fs';
import chalk from 'chalk';
import { lastMigrationPath, migrationListPath } from '../utils/constants/migrations.js';

const rollback = async () => {
  let data = await fs.promises.readFile(migrationListPath, 'utf-8');
  const migrationsList = data.trim().split('\n');
  try {
    data = await fs.promises.readFile(lastMigrationPath, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.promises.writeFile(lastMigrationPath, '-1', 'utf-8');
      console.log(chalk.blue('no migration to rollback'));
      return;
    } else {
      throw error;
    }
  }
  const lastMigration = Number(data);
  if (lastMigration < 0) return;

  const migrationIndex = lastMigration;
  const rollbackCount = Math.min(Number(process.argv[2] ? process.argv[2] : 1), migrationIndex + 1);
  let i;
  try {
    for (i = 0; i < rollbackCount; i++) {
      const { down } = await import(`../migrations/${migrationsList[migrationIndex - i]}.js`);
      const error = await down();
      if (error) {
        throw error;
      }
      await fs.promises.writeFile(lastMigrationPath, `${lastMigration - 1}`, 'utf-8');
      console.log(chalk.green(`rolled back ${migrationsList[lastMigration - i]} successfully!`));
    }
  } catch (error) {
    console.log(chalk.red(`error running rollback ${migrationsList[lastMigration - i]}`));
    console.log(error);
  }
  if (process.env.NODE_ENV === 'development') process.exit();
};

rollback();
