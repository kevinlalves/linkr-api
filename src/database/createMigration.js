import fs from 'fs';

const createMigration = async () => {
  const migrationTemplate = await fs.promises.readFile('./src/database/migrationTemplate.js', 'utf-8');

  const migrationName = process.argv[2];

  await fs.promises.appendFile('./src/database/migrationsList.txt', migrationName + '\n', 'utf-8');
  await fs.promises.writeFile(`./src/migrations/${migrationName}.js`, migrationTemplate, 'utf-8');
};

createMigration();
