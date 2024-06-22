import {client} from "./client";

client.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content varchar(500) NOT NULL
    )
`);