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
            const insertUserValue = [username, password];
            client_1.pool.query(insertUserQuery, insertUserValue, (err, _res) => {
                if (err)
                    throw err;
            });
        }
        catch (err) {
            console.log(err);
            return [];
        }
    };
    static deleteUser = async (username, password) => {
        try {
            const deleteUserQuery = `
        DELETE FROM users
        WHERE name = $1 AND password = $2;
      `;
            const deleteUserValue = [username, password];
            await client_1.pool.query(deleteUserQuery, deleteUserValue);
            return { success: true, message: "User deleted" };
        }
        catch (err) {
            console.log(err);
            return { success: false, message: "Error deleting user" };
        }
    };
    static findUser = async (username) => {
        try {
            const findUserQuery = `
            SELECT * FROM users WHERE name = $1
        `;
            const findUserValues = [username];
            const { rows: user } = await client_1.pool.query(findUserQuery, findUserValues);
            return user;
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
            const findUserValues = [username, password];
            const { rows: user } = await client_1.pool.query(findUserQuery, findUserValues);
            return user;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    };
}
exports.UsersRepo = UsersRepo;
