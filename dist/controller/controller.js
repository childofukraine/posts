"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const users_1 = require("../repositories/users");
const boom_1 = require("@hapi/boom");
class Controller {
    static registration = async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const userExists = await users_1.UsersRepo.findUser(username);
            if (userExists.length) {
                throw (0, boom_1.badData)(`A user with this username: ${username} already exists`);
            }
            const user = await users_1.UsersRepo.addUser(username, password);
            res.json({ message: `Registration success,${username}!`, status: "ok" });
        }
        catch (err) {
            next(err);
        }
    };
    static login = async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await users_1.UsersRepo.findUserByNameAndPassword(username, password);
            if (user.length) {
                res.json({
                    message: `Login success!`,
                    status: "ok",
                });
            }
            throw (0, boom_1.badData)(`Wrong username or password!`);
        }
        catch (err) {
            next(err);
        }
    };
}
exports.Controller = Controller;
