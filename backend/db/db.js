const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { DB_FILE } = process.env; 

const dbPath = path.resolve(__dirname, DB_FILE || 'product_showcase.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(`Could not connect to database at ${dbPath}: ${err.message}`);
  } else {
    console.log(`Connected to the SQLite database at ${dbPath}.`);
  }
});

module.exports = db;