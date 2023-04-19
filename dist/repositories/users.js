"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepo = void 0;
const client_1 = require("../database/client");
class UsersRepo {
    static addUser = async (username, password) => {
        const insertUserQuery = `
            INSERT INTO users (name,password)
            VALUES ('${username}','${password}')
        `;
        await client_1.pool.connect();
        client_1.pool.query(insertUserQuery, (err, _res) => {
            if (err)
                throw err;
        });
    };
    static findUser = async (username) => {
        const findUserQuery = `
            SELECT * FROM users WHERE name = $1
        `;
        let userInfo = [];
        await client_1.pool.connect();
        await client_1.pool
            .query(findUserQuery, [username])
            .then((result) => {
            userInfo = result.rows;
        })
            .catch((err) => console.log(err));
        return userInfo;
    };
    static findUserByNameAndPassword = async (username, password) => {
        const findUserQuery = `
            SELECT * FROM users WHERE name = $1 and password = $2
        `;
        let userInfo = [];
        await client_1.pool.connect();
        await client_1.pool
            .query(findUserQuery, [username, password])
            .then((result) => {
            userInfo = result.rows;
        })
            .catch((err) => console.log(err));
        return userInfo;
    };
}
exports.UsersRepo = UsersRepo;
