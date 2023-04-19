"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../database/client");
const schema_1 = require("../database/schema");
client_1.client.connect(() => {
    client_1.client.query(schema_1.usersTableQuery, (err, res) => {
        if (err)
            throw err;
        console.log('Таблица users создана (если не существует)');
    });
    client_1.client.query(schema_1.postsTableQuery, (err, res) => {
        if (err)
            throw err;
        console.log('Таблица posts создана (если не существует)');
    });
    client_1.client.query(schema_1.commentsTableQuery, (err, res) => {
        if (err)
            throw err;
        console.log('Таблица comments создана (если не существует)');
        client_1.client.end();
    });
});
