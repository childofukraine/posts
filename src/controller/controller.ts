import { Request, Response, NextFunction } from "express";
import { UsersRepo } from "../repositories/users";

import { badData } from "@hapi/boom";
export class Controller {
  static registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const userExists = await UsersRepo.findUser(username);
      if (userExists.length) {
        throw badData(`A user with this username: ${username} already exists`);
      }
      const user = await UsersRepo.addUser(username, password);
      res.json({ message: `Registration success,${username}!`, status: "ok" });
    } catch (err) {
      next(err);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await UsersRepo.findUserByNameAndPassword(
        username,
        password
      );
      if (user.length) {
        res.json({
          message: `Login success!`,
          status: "ok",
        });
      }
      throw badData(`Wrong username or password!`);
    } catch (err) {
      next(err);
    }
  };
}
