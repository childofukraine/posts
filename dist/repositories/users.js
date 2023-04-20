"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepo = void 0;
const client_1 = require("../database/client");
class UsersRepo {
    static addUser = async (username, password) => {
        try {
            const insertUserQuery = `
            INSERT INTO users (name,password)
            VALUES ($1, $2)
        `;
            client_1.pool.query(insertUserQuery, [username, password], (err, _res) => {
                if (err)
                    throw err;
            });
        }
        catch (err) {
            console.log(err);
            return [];
        }
    };
    static findUser = async (username) => {
        try {
            const findUserQuery = `
            SELECT * FROM users WHERE name = $1
        `;
            let userInfo = [];
            await client_1.pool
                .query(findUserQuery, [username])
                .then((result) => {
                userInfo = result.rows;
            })
                .catch((err) => console.log(err));
            return userInfo;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    };
    static findUserByNameAndPassword = async (username, password) => {
        try {
            const findUserQuery = `
            SELECT * FROM users WHERE name = $1 and password = $2
        `;
            let userInfo = [];
            await client_1.pool
                .query(findUserQuery, [username, password])
                .then((result) => {
                userInfo = result.rows;
            })
                .catch((err) => console.log(err));
            return userInfo;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    };
}
exports.UsersRepo = UsersRepo;
