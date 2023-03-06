import fs from 'fs';

const migrate = async () => {
  let data = await fs.promises.readFile('./src/database/migrationsList.txt', 'utf-8');
  const migrationsList = data.trim().split('\n');

  try {
    data = await fs.promises.readFile('./src/database/lastMigration.txt', 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.promises.writeFile('./src/database/lastMigration.txt', '-1', 'utf-8');

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

      console.log(`migrated ${migrationsList[migrationIndex]} successfully!`);
    } catch (error) {
      await fs.promises.writeFile('./src/database/lastMigration.txt', `${migrationIndex - 1}`, 'utf-8');

      console.log(`error running migration ${migrationsList[migrationIndex]}`);
      console.log(error);
      return;
    }
  }

  await fs.promises.writeFile('./src/database/lastMigration.txt', `${migrationsList.length - 1}`, 'utf-8');

  if (process.env.NODE_ENV === 'development') process.exit();
};

migrate();
