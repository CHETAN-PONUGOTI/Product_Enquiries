console.log('--- SEED SCRIPT V2.1 EXECUTING ---');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./db');

function runSeed() {
  const schemaPath = path.resolve(__dirname, './schema.sql');
  const seedPath = path.resolve(__dirname, './seed.sql');

  let schemaSql, seedSql;

  try {
    schemaSql = fs.readFileSync(schemaPath, 'utf8');
    seedSql = fs.readFileSync(seedPath, 'utf8');
  } catch (err) {
    console.error(`\n--- FATAL ERROR --- Could not read SQL files. Check paths or file existence:`);
    console.error(`Path tried: ${err.path}`);
    console.error(`Error message: ${err.message}`);
    db.close(); 
    return;
  }
  
  db.exec(schemaSql, (err) => {
    if (err) {
      console.error('\n--- SQL EXECUTION ERROR --- Error executing schema.sql:', err.message);
      db.close();
      return;
    }
    console.log('Schema created successfully.');

    db.exec(seedSql, (err) => {
      if (err) {
        console.error('\n--- SQL EXECUTION ERROR --- Error executing seed.sql:', err.message);
        db.close();
        return;
      }
      console.log('Sample data inserted successfully. hey');

      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed.');
        }
      });
    });
  });
}

runSeed();