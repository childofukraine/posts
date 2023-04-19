"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const users_1 = require("../repositories/users");
const registrationValidator_1 = require("../validation/registrationValidator");
const boom_1 = require("@hapi/boom");
class Controller {
    static registration = async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        try {
            const validationResult = registrationValidator_1.schema.validate({ username, password });
            const { error } = validationResult;
            const valid = error == null;
            if (!valid) {
                throw (0, boom_1.badData)("Сheck the length of username or password (allowable length: 3-30 characters)");
            }
            const userExists = await users_1.UsersRepo.findUser(username);
            if (userExists.length) {
                throw (0, boom_1.badData)(`A user with this username: ${username} already exists`);
            }
            const user = await users_1.UsersRepo.addUser(username, password);
            res.json({ message: "Registration success" });
        }
        catch (err) {
            next(err);
        }
    };
}
exports.Controller = Controller;
