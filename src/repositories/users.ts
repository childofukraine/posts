import { client, pool } from "../database/client";
import { UserInfo } from "../types";

export class UsersRepo {
  static addUser = async (username: string, password: string) => {
    const insertUserQuery = `
            INSERT INTO users (name,password)
            VALUES ('${username}','${password}')
        `;
    await pool.connect();
    pool.query(insertUserQuery, (err, _res) => {
      if (err) throw err;
    });
  };

  static findUser = async (username: string) => {
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
  };
}
