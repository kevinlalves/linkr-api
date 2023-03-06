import fs from 'fs';

const rollback = async () => {
  let data = await fs.promises.readFile('./src/database/migrationsList.txt', 'utf-8');
  const migrationsList = data.trim().split('\n');

  try {
    data = await fs.promises.readFile('./src/database/lastMigration.txt', 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.promises.writeFile('./src/database/lastMigration.txt', '-1', 'utf-8');

      console.log('no migration to rollback');
      return;
    } else {
      throw error;
    }
  }
  const lastMigration = Number(data);

  if (lastMigration < 0) return;

  try {
    const { down } = await import(`../migrations/${migrationsList[lastMigration]}.js`);
    const error = await down();
    if (error) {
      throw error;
    }

    await fs.promises.writeFile('./src/database/lastMigration.txt', `${lastMigration - 1}`, 'utf-8');
    console.log(`rolled back ${migrationsList[lastMigration]} successfully!`);
  } catch (error) {
    console.log(`error running rollback ${migrationsList[lastMigration]}`);
    console.log(error);
  }
  process.exit();
};

rollback();
