import fs from 'fs';
import { lastMigrationPath, migrationListPath } from '../utils/constants/migrations.js';

const deleteMigration = async () => {
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
  let migrationIndex = migrationsList.length - 1;
  try {
    while (migrationIndex > lastMigration) {
      await fs.promises.unlink(`src/migrations/${migrationsList[migrationIndex]}.js`);

      console.log(`deleted ${migrationsList[migrationIndex]} successfully!`);
      migrationIndex--;
    }
  } catch (error) {
    console.log(`error running delete on ${migrationsList[migrationIndex]}`);
    console.log(error);
    return;
  }

  await fs.promises.writeFile(
    migrationListPath,
    migrationsList.length ? migrationsList.slice(0, migrationIndex + 1).join('\n') : '' + '\n',
    'utf-8'
  );
  if (process.env.NODE_ENV === 'development') process.exit();
};

await deleteMigration();
