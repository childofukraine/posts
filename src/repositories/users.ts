import { pool } from "../database/client";
import { UserInfo } from "../types";

export class UsersRepo {
  static addUser = async (username: string, password: string) => {
    try {
      const insertUserQuery = `
            INSERT INTO users (name,password)
            VALUES ($1, $2)
        `;
      await pool.connect();
      pool.query(insertUserQuery, [username, password], (err, _res) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  static findUser = async (username: string) => {
    try {
      const findUserQuery = `
            SELECT * FROM users WHERE name = $1
        `;
      let userInfo: UserInfo[] = [];
      await pool.connect();

      await pool
        .query(findUserQuery, [username])
        .then((result) => {
          userInfo = result.rows;
        })
        .catch((err) => console.log(err));
      return userInfo;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  static findUserByNameAndPassword = async (
    username: string,
    password: string
  ) => {
    try {
      const findUserQuery = `
            SELECT * FROM users WHERE name = $1 and password = $2
        `;
      let userInfo: UserInfo[] = [];
      await pool.connect();

      await pool
        .query(findUserQuery, [username, password])
        .then((result) => {
          userInfo = result.rows;
        })
        .catch((err) => console.log(err));
      return userInfo;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
}
