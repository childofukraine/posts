import { Request, Response, NextFunction } from "express";
import { UsersRepo } from "../repositories/users";
import { schema } from "../validation/registrationValidator";
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
      const validationResult = schema.validate({ username, password });
      const { error } = validationResult;
      const valid = error == null;
      if (!valid) {
          throw badData(
              "Сheck the length of username or password (allowable length: 3-30 characters)"
              );
        }
    const userExists = await UsersRepo.findUser(username);
    if (userExists.length) {
        throw badData(`A user with this username: ${username} already exists`);
    }
    const user = await UsersRepo.addUser(username, password);
    res.json({ message: "Registration success" });
    } catch (err) {
      next(err);
    }
  };
}
