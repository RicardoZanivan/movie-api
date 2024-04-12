const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "../../../../population.db";

function connectToDatabase() {
    // fs.unlinkSync(filepath);
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    } else {
        const db = new sqlite3.Database(filepath, (error) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
            console.log("Connected to the database successfully");
        });
        return db;
    }
}

function createTable(db) {
    db.exec(`
        CREATE TABLE migration
        (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            year        NUMERIC,
            title       VARCHAR(255),
            studios     VARCHAR(255),
            producers   VARCHAR(255),
            winner      VARCHAR(10)
        )
    `);
}

module.exports = connectToDatabase();