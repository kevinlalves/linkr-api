import fs from 'fs';

const deleteMigration = async () => {
  const data = await fs.promises.readFile('./src/database/migrationsList.txt', 'utf-8');
  const migrationsList = data.trim().split('\n');
  migrationsList.pop();

  const migrationName = process.argv[2];

  await fs.promises.writeFile('./src/database/migrationsList.txt', migrationsList.join('\n') + '\n', 'utf-8');
  await fs.promises.unlink(`./src/migrations/${migrationName}.js`);
};

await deleteMigration();
